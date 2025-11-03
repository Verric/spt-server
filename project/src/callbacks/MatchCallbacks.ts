import { MatchController } from "@spt/controllers/MatchController";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { IMetrics } from "@spt/models/eft/common/tables/IMatch";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { IEndLocalRaidRequestData } from "@spt/models/eft/match/IEndLocalRaidRequestData";
import { IGetRaidConfigurationRequestData } from "@spt/models/eft/match/IGetRaidConfigurationRequestData";
import { IGroupCharacter } from "@spt/models/eft/match/IGroupCharacter";
import { IMatchGroupCurrentResponse } from "@spt/models/eft/match/IMatchGroupCurrentResponse";
import { IMatchGroupStartGameRequest } from "@spt/models/eft/match/IMatchGroupStartGameRequest";
import { IMatchGroupStatusRequest } from "@spt/models/eft/match/IMatchGroupStatusRequest";
import { IMatchGroupStatusResponse } from "@spt/models/eft/match/IMatchGroupStatusResponse";
import { IProfileStatusResponse } from "@spt/models/eft/match/IProfileStatusResponse";
import { IPutMetricsRequestData } from "@spt/models/eft/match/IPutMetricsRequestData";
import { IStartLocalRaidRequestData } from "@spt/models/eft/match/IStartLocalRaidRequestData";
import { IStartLocalRaidResponseData } from "@spt/models/eft/match/IStartLocalRaidResponseData";
import { DatabaseService } from "@spt/services/DatabaseService";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { JsonUtil } from "@spt/utils/JsonUtil";
import { inject, injectable } from "tsyringe";

@injectable()
export class MatchCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected jsonUtil: JsonUtil;
    protected matchController: MatchController;
    protected databaseService: DatabaseService;

    constructor(
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("JsonUtil") jsonUtil: JsonUtil,
        @inject("MatchController") matchController: MatchController,
        @inject("DatabaseService") databaseService: DatabaseService
    ) {
        this.httpResponse = httpResponse;
        this.jsonUtil = jsonUtil;
        this.matchController = matchController;
        this.databaseService = databaseService;
    }

    /** Handle client/match/updatePing */
    public updatePing(): INullResponseData {
        return this.httpResponse.nullResponse();
    }

    // Handle client/match/exit
    public exitMatch(): INullResponseData {
        return this.httpResponse.nullResponse();
    }

    /** Handle client/match/group/exit_from_menu */
    public exitFromMenu(): INullResponseData {
        return this.httpResponse.nullResponse();
    }

    /** Handle client/match/group/current */
    public groupCurrent(): IGetBodyResponseData<IMatchGroupCurrentResponse> {
        const response: IMatchGroupCurrentResponse = { squad: [] };
        return this.httpResponse.getBody(response);
    }

    /** Handle client/match/group/looking/start */
    public startGroupSearch(): INullResponseData {
        return this.httpResponse.nullResponse();
    }

    /** Handle client/match/group/looking/stop */
    public stopGroupSearch(): INullResponseData {
        return this.httpResponse.nullResponse();
    }

    /** Handle client/match/group/invite/send */
    public sendGroupInvite(): IGetBodyResponseData<string> {
        return this.httpResponse.getBody("2427943f23698ay9f2863735");
    }

    /** Handle client/match/group/invite/accept */
    public acceptGroupInvite(): IGetBodyResponseData<IGroupCharacter[]> {
        const result: IGroupCharacter[] = [];
        return this.httpResponse.getBody(result);
    }

    /** Handle client/match/group/invite/decline */
    public declineGroupInvite(): IGetBodyResponseData<boolean> {
        return this.httpResponse.getBody(true);
    }

    /** Handle client/match/group/invite/cancel */
    public cancelGroupInvite(): IGetBodyResponseData<boolean> {
        return this.httpResponse.getBody(true);
    }

    /** Handle client/match/group/transfer */
    public transferGroup(): IGetBodyResponseData<boolean> {
        return this.httpResponse.getBody(true);
    }

    /** Handle client/match/group/invite/cancel-all */
    public cancelAllGroupInvite(): IGetBodyResponseData<boolean> {
        return this.httpResponse.getBody(true);
    }

    /** Handle client/putMetrics */
    public putMetrics(_request: IPutMetricsRequestData): INullResponseData {
        return this.httpResponse.nullResponse();
    }

    /** Handle client/analytics/event-disconnect */
    public eventDisconnect(_request: IPutMetricsRequestData): INullResponseData {
        return this.httpResponse.nullResponse();
    }

    // Handle client/match/available
    public serverAvailable(): IGetBodyResponseData<boolean> {
        const output = this.matchController.getEnabled();

        return this.httpResponse.getBody(output);
    }

    /** Handle match/group/start_game */
    public joinMatch(
        info: IMatchGroupStartGameRequest,
        sessionID: string
    ): IGetBodyResponseData<IProfileStatusResponse> {
        return this.httpResponse.getBody(this.matchController.joinMatch(info, sessionID));
    }

    /** Handle client/getMetricsConfig */
    public getMetrics(): IGetBodyResponseData<IMetrics> {
        return this.httpResponse.getBody(this.databaseService.getMatch().metrics);
    }

    /**
     * Called periodically while in a group
     * Handle client/match/group/status
     * @returns
     */
    public getGroupStatus(info: IMatchGroupStatusRequest): IGetBodyResponseData<IMatchGroupStatusResponse> {
        return this.httpResponse.getBody(this.matchController.getGroupStatus(info));
    }

    /** Handle client/match/group/delete */
    public deleteGroup(info: IEmptyRequestData): IGetBodyResponseData<boolean> {
        this.matchController.deleteGroup(info);
        return this.httpResponse.getBody(true);
    }

    // Handle client/match/group/leave
    public leaveGroup(): IGetBodyResponseData<boolean> {
        return this.httpResponse.getBody(true);
    }

    /** Handle client/match/group/player/remove */
    public removePlayerFromGroup(): IGetBodyResponseData<boolean> {
        return this.httpResponse.getBody(true);
    }

    /** Handle client/match/local/start */
    public startLocalRaid(
        info: IStartLocalRaidRequestData,
        sessionID: string
    ): IGetBodyResponseData<IStartLocalRaidResponseData> {
        return this.httpResponse.getBody(this.matchController.startLocalRaid(sessionID, info));
    }

    /** Handle client/match/local/end */
    public endLocalRaid(info: IEndLocalRaidRequestData, sessionID: string): INullResponseData {
        this.matchController.endLocalRaid(sessionID, info);
        return this.httpResponse.nullResponse();
    }

    /** Handle client/raid/configuration */
    public getRaidConfiguration(info: IGetRaidConfigurationRequestData, sessionID: string): INullResponseData {
        this.matchController.configureOfflineRaid(info, sessionID);
        return this.httpResponse.nullResponse();
    }

    /** Handle client/raid/configuration-by-profile */
    public getConfigurationByProfile(): INullResponseData {
        return this.httpResponse.nullResponse();
    }

    /** Handle client/match/group/raid/ready */
    public raidReady(): IGetBodyResponseData<boolean> {
        return this.httpResponse.getBody(true);
    }

    /** Handle client/match/group/raid/not-ready */
    public notRaidReady(): IGetBodyResponseData<boolean> {
        return this.httpResponse.getBody(true);
    }
}
