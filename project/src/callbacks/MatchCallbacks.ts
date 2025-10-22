import { MatchController } from "@spt/controllers/MatchController";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { IMetrics } from "@spt/models/eft/common/tables/IMatch";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { IEndLocalRaidRequestData } from "@spt/models/eft/match/IEndLocalRaidRequestData";
import { IGetRaidConfigurationRequestData } from "@spt/models/eft/match/IGetRaidConfigurationRequestData";
import { IGroupCharacter } from "@spt/models/eft/match/IGroupCharacter";
import { IMatchGroupCurrentResponse } from "@spt/models/eft/match/IMatchGroupCurrentResponse";
import { IMatchGroupInviteSendRequest } from "@spt/models/eft/match/IMatchGroupInviteSendRequest";
import { IMatchGroupPlayerRemoveRequest } from "@spt/models/eft/match/IMatchGroupPlayerRemoveRequest";
import { IMatchGroupStartGameRequest } from "@spt/models/eft/match/IMatchGroupStartGameRequest";
import { IMatchGroupStatusRequest } from "@spt/models/eft/match/IMatchGroupStatusRequest";
import { IMatchGroupStatusResponse } from "@spt/models/eft/match/IMatchGroupStatusResponse";
import { IMatchGroupTransferRequest } from "@spt/models/eft/match/IMatchGroupTransferRequest";
import { IProfileStatusResponse } from "@spt/models/eft/match/IProfileStatusResponse";
import { IPutMetricsRequestData } from "@spt/models/eft/match/IPutMetricsRequestData";
import { IRequestIdRequest } from "@spt/models/eft/match/IRequestIdRequest";
import { IStartLocalRaidRequestData } from "@spt/models/eft/match/IStartLocalRaidRequestData";
import { IStartLocalRaidResponseData } from "@spt/models/eft/match/IStartLocalRaidResponseData";
import { IUpdatePingRequestData } from "@spt/models/eft/match/IUpdatePingRequestData";
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
        @inject("DatabaseService") databaseService: DatabaseService,
    ) {
        this.httpResponse = httpResponse;
        this.jsonUtil = jsonUtil;
        this.matchController = matchController;
        this.databaseService = databaseService;
    }

    /** Handle client/match/updatePing */
    public updatePing(_url: string, _info: IUpdatePingRequestData, _sessionID: string): INullResponseData {
        return this.httpResponse.nullResponse();
    }

    // Handle client/match/exit
    public exitMatch(_url: string, _info: IEmptyRequestData, _sessionID: string): INullResponseData {
        return this.httpResponse.nullResponse();
    }

    /** Handle client/match/group/exit_from_menu */
    public exitFromMenu(_url: string, _info: IEmptyRequestData, _sessionID: string): INullResponseData {
        return this.httpResponse.nullResponse();
    }

    /** Handle client/match/group/current */
    public groupCurrent(
        _url: string,
        _info: IEmptyRequestData,
        _sessionID: string,
    ): IGetBodyResponseData<IMatchGroupCurrentResponse> {
        const response: IMatchGroupCurrentResponse = { squad: [] };
        return this.httpResponse.getBody(response);
    }

    /** Handle client/match/group/looking/start */
    public startGroupSearch(_url: string, _info: IEmptyRequestData, _sessionID: string): INullResponseData {
        return this.httpResponse.nullResponse();
    }

    /** Handle client/match/group/looking/stop */
    public stopGroupSearch(_url: string, _info: IEmptyRequestData, _sessionID: string): INullResponseData {
        return this.httpResponse.nullResponse();
    }

    /** Handle client/match/group/invite/send */
    public sendGroupInvite(
        _url: string,
        _info: IMatchGroupInviteSendRequest,
        _sessionID: string,
    ): IGetBodyResponseData<string> {
        return this.httpResponse.getBody("2427943f23698ay9f2863735");
    }

    /** Handle client/match/group/invite/accept */
    public acceptGroupInvite(
        _url: string,
        _info: IRequestIdRequest,
        _sessionId: string,
    ): IGetBodyResponseData<IGroupCharacter[]> {
        const result: IGroupCharacter[] = [];
        return this.httpResponse.getBody(result);
    }

    /** Handle client/match/group/invite/decline */
    public declineGroupInvite(
        _url: string,
        _info: IRequestIdRequest,
        _sessionId: string,
    ): IGetBodyResponseData<boolean> {
        return this.httpResponse.getBody(true);
    }

    /** Handle client/match/group/invite/cancel */
    public cancelGroupInvite(
        _url: string,
        _info: IRequestIdRequest,
        _sessionID: string,
    ): IGetBodyResponseData<boolean> {
        return this.httpResponse.getBody(true);
    }

    /** Handle client/match/group/transfer */
    public transferGroup(
        _url: string,
        _info: IMatchGroupTransferRequest,
        _sessionId: string,
    ): IGetBodyResponseData<boolean> {
        return this.httpResponse.getBody(true);
    }

    /** Handle client/match/group/invite/cancel-all */
    public cancelAllGroupInvite(
        _url: string,
        _info: IEmptyRequestData,
        _sessionId: string,
    ): IGetBodyResponseData<boolean> {
        return this.httpResponse.getBody(true);
    }

    /** Handle client/putMetrics */
    public putMetrics(_url: string, _request: IPutMetricsRequestData, _sessionId: string): INullResponseData {
        return this.httpResponse.nullResponse();
    }

    /** Handle client/analytics/event-disconnect */
    public eventDisconnect(_url: string, _request: IPutMetricsRequestData, _sessionId: string): INullResponseData {
        return this.httpResponse.nullResponse();
    }

    // Handle client/match/available
    public serverAvailable(_url: string, _info: IEmptyRequestData, _sessionId: string): IGetBodyResponseData<boolean> {
        const output = this.matchController.getEnabled();

        return this.httpResponse.getBody(output);
    }

    /** Handle match/group/start_game */
    public joinMatch(
        _url: string,
        info: IMatchGroupStartGameRequest,
        sessionID: string,
    ): IGetBodyResponseData<IProfileStatusResponse> {
        return this.httpResponse.getBody(this.matchController.joinMatch(info, sessionID));
    }

    /** Handle client/getMetricsConfig */
    public getMetrics(_url: string, _info: any, _sessionID: string): IGetBodyResponseData<IMetrics> {
        return this.httpResponse.getBody(this.databaseService.getMatch().metrics);
    }

    /**
     * Called periodically while in a group
     * Handle client/match/group/status
     * @returns
     */
    public getGroupStatus(
        _url: string,
        info: IMatchGroupStatusRequest,
        _sessionID: string,
    ): IGetBodyResponseData<IMatchGroupStatusResponse> {
        return this.httpResponse.getBody(this.matchController.getGroupStatus(info));
    }

    /** Handle client/match/group/delete */
    public deleteGroup(_url: string, info: IEmptyRequestData, _sessionID: string): IGetBodyResponseData<boolean> {
        this.matchController.deleteGroup(info);
        return this.httpResponse.getBody(true);
    }

    // Handle client/match/group/leave
    public leaveGroup(_url: string, _info: IEmptyRequestData, _sessionID: string): IGetBodyResponseData<boolean> {
        return this.httpResponse.getBody(true);
    }

    /** Handle client/match/group/player/remove */
    public removePlayerFromGroup(
        _url: string,
        _info: IMatchGroupPlayerRemoveRequest,
        _sessionID: string,
    ): IGetBodyResponseData<boolean> {
        return this.httpResponse.getBody(true);
    }

    /** Handle client/match/local/start */
    public startLocalRaid(
        _url: string,
        info: IStartLocalRaidRequestData,
        sessionID: string,
    ): IGetBodyResponseData<IStartLocalRaidResponseData> {
        return this.httpResponse.getBody(this.matchController.startLocalRaid(sessionID, info));
    }

    /** Handle client/match/local/end */
    public endLocalRaid(_url: string, info: IEndLocalRaidRequestData, sessionID: string): INullResponseData {
        this.matchController.endLocalRaid(sessionID, info);
        return this.httpResponse.nullResponse();
    }

    /** Handle client/raid/configuration */
    public getRaidConfiguration(
        _url: string,
        info: IGetRaidConfigurationRequestData,
        sessionID: string,
    ): INullResponseData {
        this.matchController.configureOfflineRaid(info, sessionID);
        return this.httpResponse.nullResponse();
    }

    /** Handle client/raid/configuration-by-profile */
    public getConfigurationByProfile(
        _url: string,
        _info: IGetRaidConfigurationRequestData,
        _sessionID: string,
    ): INullResponseData {
        return this.httpResponse.nullResponse();
    }

    /** Handle client/match/group/raid/ready */
    public raidReady(_url: string, _info: IEmptyRequestData, _sessionId: string): IGetBodyResponseData<boolean> {
        return this.httpResponse.getBody(true);
    }

    /** Handle client/match/group/raid/not-ready */
    public notRaidReady(_url: string, _info: IEmptyRequestData, _sessionId: string): IGetBodyResponseData<boolean> {
        return this.httpResponse.getBody(true);
    }
}
