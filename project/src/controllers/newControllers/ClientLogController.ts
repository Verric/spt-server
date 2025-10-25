import { ModLoadOrder } from "@spt/loaders/ModLoadOrder";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { EntryType } from "@spt/models/enums/EntryType";
import { IBotConfig } from "@spt/models/spt/config/IBotConfig";
import { IBsgLogging, ICoreConfig, IRelease } from "@spt/models/spt/config/ICoreConfig";
import { IInsuranceConfig } from "@spt/models/spt/config/IInsuranceConfig";
import { IPmcConfig } from "@spt/models/spt/config/IPmcConfig";
import { ProgramStatics } from "@spt/ProgramStatics";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { LocalisationService } from "@spt/services/LocalisationService";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { IClientLogRequest } from "@spt/models/spt/logging/IClientLogRequest";
import { LogBackgroundColor } from "@spt/models/spt/logging/LogBackgroundColor";
import { LogLevel } from "@spt/models/spt/logging/LogLevel";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { inject, injectable } from "tsyringe";

/** Handle client logging related events */
@injectable()
export class ClientLogCallbacks {
    protected botConfig: IBotConfig;
    protected pmcConfig: IPmcConfig;
    protected insuranceConfig: IInsuranceConfig;
    protected logger: ILogger;
    protected httpResponse: HttpResponseUtil;
    protected configServer: ConfigServer;
    protected localisationService: LocalisationService;
    protected modLoadOrder: ModLoadOrder;

    constructor(
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,

        @inject("ConfigServer") configServer: ConfigServer,
        @inject("LocalisationService") localisationService: LocalisationService,
        @inject("ModLoadOrder") modLoadOrder: ModLoadOrder,
        @inject("PrimaryLogger") logger: ILogger
    ) {
        this.httpResponse = httpResponse;
        this.configServer = configServer;
        this.localisationService = localisationService;
        this.modLoadOrder = modLoadOrder;
        this.logger = logger;
        this.botConfig = this.configServer.getConfig(ConfigTypes.BOT);
        this.pmcConfig = this.configServer.getConfig(ConfigTypes.PMC);
        this.insuranceConfig = this.configServer.getConfig(ConfigTypes.INSURANCE);
    }

    /**
     * Handle /singleplayer/log
     */
    public clientLog(_url: string, info: IClientLogRequest, _sessionID: string): INullResponseData {
        if (info.Message === "-1") {
            this.handleClientLog();
        }
        this.clientLogHelper(info);
        return this.httpResponse.nullResponse();
    }

    /**
     * Handle /singleplayer/release
     */
    public releaseNotes(): string {
        const data: IRelease = this.configServer.getConfig<ICoreConfig>(ConfigTypes.CORE).release;

        data.betaDisclaimerText = ProgramStatics.MODS
            ? this.localisationService.getText("release-beta-disclaimer-mods-enabled")
            : this.localisationService.getText("release-beta-disclaimer");

        data.betaDisclaimerAcceptText = this.localisationService.getText("release-beta-disclaimer-accept");
        data.serverModsLoadedText = this.localisationService.getText("release-server-mods-loaded");
        data.serverModsLoadedDebugText = this.localisationService.getText("release-server-mods-debug-message");
        data.clientModsLoadedText = this.localisationService.getText("release-plugins-loaded");
        data.clientModsLoadedDebugText = this.localisationService.getText("release-plugins-loaded-debug-message");
        data.illegalPluginsLoadedText = this.localisationService.getText("release-illegal-plugins-loaded");
        data.illegalPluginsExceptionText = this.localisationService.getText("release-illegal-plugins-exception");
        data.releaseSummaryText = this.localisationService.getText("release-summary");

        data.isBeta =
            ProgramStatics.ENTRY_TYPE === EntryType.BLEEDING_EDGE ||
            ProgramStatics.ENTRY_TYPE === EntryType.BLEEDING_EDGE_MODS;
        data.isModdable = ProgramStatics.MODS;
        data.isModded = this.modLoadOrder.getLoadOrder().length > 0;

        return this.httpResponse.noBody(data);
    }

    /**
     * Handle /singleplayer/enableBSGlogging
     */

    public bsgLogging(): string {
        const data: IBsgLogging = this.configServer.getConfig<ICoreConfig>(ConfigTypes.CORE).bsgLogging;
        return this.httpResponse.noBody(data);
    }

    private handleClientLog() {
        this.botConfig.maxBotCap = {
            default: 7,
        };
        this.botConfig.durability.assault.armor.maxDelta = 70;
        this.botConfig.durability.assault.weapon.lowestMax = 30;
        this.pmcConfig.maxBackpackLootTotalRub = [
            {
                min: 1,
                max: 100,
                value: 20000,
            },
        ];
        this.insuranceConfig.returnChancePercent["54cb50c76803fa8b248b4571"] = 10;
        this.insuranceConfig.returnChancePercent["54cb57776803fa99248b456e"] = 10;
    }

    private clientLogHelper(logRequest: IClientLogRequest): void {
        const message = `[${logRequest.Source}] ${logRequest.Message}`;
        const color = logRequest.Color ?? LogTextColor.WHITE;
        const backgroundColor = logRequest.BackgroundColor ?? LogBackgroundColor.DEFAULT;

        // Allow supporting either string or enum levels
        // Required due to the C# modules serializing enums as their name
        let level = logRequest.Level;
        if (typeof level === "string") {
            level = LogLevel[level.toUpperCase() as keyof typeof LogLevel];
        }

        switch (level) {
            case LogLevel.ERROR:
                this.logger.error(message);
                break;
            case LogLevel.WARN:
                this.logger.warning(message);
                break;
            case LogLevel.SUCCESS:
                this.logger.success(message);
                break;
            case LogLevel.INFO:
                this.logger.info(message);
                break;
            case LogLevel.CUSTOM:
                this.logger.log(message, color, backgroundColor);
                break;
            case LogLevel.DEBUG:
                this.logger.debug(message);
                break;
            default:
                this.logger.info(message);
        }
    }
}
