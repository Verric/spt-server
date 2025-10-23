import { ApplicationContext } from "@spt/context/ApplicationContext";
import { ContextVariableType } from "@spt/context/ContextVariableType";
import { IEndLocalRaidRequestData } from "@spt/models/eft/match/IEndLocalRaidRequestData";
import { IGetRaidConfigurationRequestData } from "@spt/models/eft/match/IGetRaidConfigurationRequestData";
import { IMatchGroupStartGameRequest } from "@spt/models/eft/match/IMatchGroupStartGameRequest";
import { IMatchGroupStatusRequest } from "@spt/models/eft/match/IMatchGroupStatusRequest";
import { IMatchGroupStatusResponse } from "@spt/models/eft/match/IMatchGroupStatusResponse";
import { IProfileStatusResponse } from "@spt/models/eft/match/IProfileStatusResponse";
import { IStartLocalRaidRequestData } from "@spt/models/eft/match/IStartLocalRaidRequestData";
import { IStartLocalRaidResponseData } from "@spt/models/eft/match/IStartLocalRaidResponseData";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { IMatchConfig } from "@spt/models/spt/config/IMatchConfig";
import { IPmcConfig } from "@spt/models/spt/config/IPmcConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SaveServer } from "@spt/servers/SaveServer";
import { LocationLifecycleService } from "@spt/services/LocationLifecycleService";
import { MatchLocationService } from "@spt/services/MatchLocationService";
import type { ICloner } from "@spt/utils/cloners/ICloner";
import { inject, injectable } from "tsyringe";

@injectable()
export class MatchController {
    protected matchConfig: IMatchConfig;
    protected pmcConfig: IPmcConfig;
    protected logger: ILogger;
    protected saveServer: SaveServer;
    protected matchLocationService: MatchLocationService;
    protected configServer: ConfigServer;
    protected applicationContext: ApplicationContext;
    protected locationLifecycleService: LocationLifecycleService;
    protected cloner: ICloner;

    constructor(
        @inject("PrimaryLogger") logger: ILogger,
        @inject("SaveServer") saveServer: SaveServer,
        @inject("MatchLocationService") matchLocationService: MatchLocationService,
        @inject("ConfigServer") configServer: ConfigServer,
        @inject("ApplicationContext") applicationContext: ApplicationContext,
        @inject("LocationLifecycleService") locationLifecycleService: LocationLifecycleService,
        @inject("PrimaryCloner") cloner: ICloner,
    ) {
        this.logger = logger;
        this.saveServer = saveServer;
        this.matchLocationService = matchLocationService;
        this.configServer = configServer;
        this.applicationContext = applicationContext;
        this.locationLifecycleService = locationLifecycleService;
        this.cloner = cloner;
        this.matchConfig = this.configServer.getConfig(ConfigTypes.MATCH);
        this.pmcConfig = this.configServer.getConfig(ConfigTypes.PMC);
    }

    public getEnabled(): boolean {
        return this.matchConfig.enabled;
    }

    /** Handle client/match/group/delete */
    public deleteGroup(info: any): void {
        this.matchLocationService.deleteGroup(info);
    }

    /** Handle match/group/start_game */
    public joinMatch(_info: IMatchGroupStartGameRequest, _sessionId: string): IProfileStatusResponse {
        const output: IProfileStatusResponse = { maxPveCountExceeded: false, profiles: [] };

        // get list of players joining into the match
        output.profiles.push({
            profileid: "TODO",
            profileToken: "TODO",
            status: "MatchWait",
            sid: "",
            ip: "",
            port: 0,
            version: "live",
            location: "TODO get location",
            raidMode: "Online",
            mode: "deathmatch",
            shortId: undefined,
            additional_info: undefined,
        });

        return output;
    }

    /** Handle client/match/group/status */
    public getGroupStatus(_info: IMatchGroupStatusRequest): IMatchGroupStatusResponse {
        return { players: [], maxPveCountExceeded: false };
    }

    /**
     * Handle /client/raid/configuration
     * @param request Raid config request
     * @param sessionID Session id
     */
    public configureOfflineRaid(request: IGetRaidConfigurationRequestData, _sessionID: string): void {
        // Store request data for access during bot generation
        this.applicationContext.addValue(ContextVariableType.RAID_CONFIGURATION, request);

        // TODO: add code to strip PMC of equipment now they've started the raid

        // Set pmcs to difficulty set in pre-raid screen if override in bot config isnt enabled
        if (!this.pmcConfig.useDifficultyOverride) {
            this.pmcConfig.difficulty = this.convertDifficultyDropdownIntoBotDifficulty(
                request.wavesSettings.botDifficulty,
            );
        }
    }

    /**
     * Convert a difficulty value from pre-raid screen to a bot difficulty
     * @param botDifficulty dropdown difficulty value
     * @returns bot difficulty
     */
    protected convertDifficultyDropdownIntoBotDifficulty(botDifficulty: string): string {
        // Edge case medium - must be altered
        if (botDifficulty.toLowerCase() === "medium") {
            return "normal";
        }

        return botDifficulty;
    }

    /** Handle client/match/local/start */
    public startLocalRaid(sessionId: string, request: IStartLocalRaidRequestData): IStartLocalRaidResponseData {
        return this.locationLifecycleService.startLocalRaid(sessionId, request);
    }

    /** Handle client/match/local/end */
    public endLocalRaid(sessionId: string, request: IEndLocalRaidRequestData): void {
        this.locationLifecycleService.endLocalRaid(sessionId, request);
    }
}
