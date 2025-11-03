import { ClientLogController } from "@spt/controllers/ClientLogController";
import { ModLoadOrder } from "@spt/loaders/ModLoadOrder";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { EntryType } from "@spt/models/enums/EntryType";
import { IBotConfig } from "@spt/models/spt/config/IBotConfig";
import { IBsgLogging, ICoreConfig, IRelease } from "@spt/models/spt/config/ICoreConfig";
import { IInsuranceConfig } from "@spt/models/spt/config/IInsuranceConfig";
import { IPmcConfig } from "@spt/models/spt/config/IPmcConfig";
import { IClientLogRequest } from "@spt/models/spt/logging/IClientLogRequest";
import { ProgramStatics } from "@spt/ProgramStatics";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { LocalisationService } from "@spt/services/LocalisationService";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { FastifyInstance, FastifyRequest } from "fastify";
import { inject } from "tsyringe";

export class ClientLogHandler {
    private botConfig: IBotConfig;
    private pmcConfig: IPmcConfig;
    private insuranceConfig: IInsuranceConfig;
    private httpResponse: HttpResponseUtil;
    private clientLogController: ClientLogController;
    private configServer: ConfigServer;
    private localisationService: LocalisationService;
    private modLoadOrder: ModLoadOrder;

    constructor(
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("ClientLogController") clientLogController: ClientLogController,
        @inject("ConfigServer") configServer: ConfigServer,
        @inject("LocalisationService") localisationService: LocalisationService,
        @inject("ModLoadOrder") modLoadOrder: ModLoadOrder
    ) {
        this.httpResponse = httpResponse;
        this.clientLogController = clientLogController;
        this.configServer = configServer;
        this.localisationService = localisationService;
        this.modLoadOrder = modLoadOrder;
        this.botConfig = this.configServer.getConfig(ConfigTypes.BOT);
        this.pmcConfig = this.configServer.getConfig(ConfigTypes.PMC);
        this.insuranceConfig = this.configServer.getConfig(ConfigTypes.INSURANCE);
    }

    clientLog(req: FastifyRequest<{ Body: IClientLogRequest }>) {
        const body = req.body;
        if (body.Message === "-1") {
            this.handleClientLog();
        }
        this.clientLogController.clientLog(body);
        return this.httpResponse.nullResponse();
    }

    releaseNotes() {
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

    bsgLogging() {
        const data: IBsgLogging = this.configServer.getConfig<ICoreConfig>(ConfigTypes.CORE).bsgLogging;
        return this.httpResponse.noBody(data);
    }

    registerRoutes(fastify: FastifyInstance) {
        fastify.get("/singleplayer/log", this.clientLog.bind(this));
        fastify.get("/singleplayer/release", this.releaseNotes.bind(this));
        fastify.get("/singleplayer/enableBSGlogging", this.bsgLogging.bind(this));
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
}
