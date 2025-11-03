import { MatchController } from "@spt/controllers/MatchController";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { IMetrics } from "@spt/models/eft/common/tables/IMatch";
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
import { FastifyInstance, FastifyRequest } from "fastify";
import { inject } from "tsyringe";

export class MatchHandler {
    private httpResponse: HttpResponseUtil;
    private matchController: MatchController;
    private databaseService: DatabaseService;

    constructor(
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("MatchController") matchController: MatchController,
        @inject("DatabaseService") databaseService: DatabaseService
    ) {
        this.httpResponse = httpResponse;
        this.matchController = matchController;
        this.databaseService = databaseService;
    }

    serverAvailable() {
        return this.httpResponse.getBody<boolean>(this.matchController.getEnabled());
    }

    updatePing() {
        return this.httpResponse.nullResponse();
    }

    joinMatch(req: FastifyRequest<{ Body: IMatchGroupStartGameRequest }>) {
        return this.httpResponse.getBody<IProfileStatusResponse>(
            this.matchController.joinMatch(req.body, req.sessionId)
        );
    }

    exitMatch() {
        return this.httpResponse.nullResponse();
    }

    deleteGroup(req: FastifyRequest<{ Body: IEmptyRequestData }>) {
        this.matchController.deleteGroup(req.body);
        return this.httpResponse.getBody(true);
    }

    leaveGroup() {
        return this.httpResponse.getBody(true);
    }

    getGroupStatus(req: FastifyRequest<{ Body: IMatchGroupStatusRequest }>) {
        return this.httpResponse.getBody<IMatchGroupStatusResponse>(this.matchController.getGroupStatus(req.body));
    }

    exitFromMenu() {
        return this.httpResponse.nullResponse();
    }

    groupCurrent() {
        const response: IMatchGroupCurrentResponse = { squad: [] };
        return this.httpResponse.getBody(response);
    }

    startGroupSearch() {
        return this.httpResponse.nullResponse();
    }

    stopGroupSearch() {
        return this.httpResponse.nullResponse();
    }

    sendGroupInvite() {
        return this.httpResponse.getBody("2427943f23698ay9f2863735");
    }

    acceptGroupInvite() {
        const result: IGroupCharacter[] = [];
        return this.httpResponse.getBody(result);
    }

    declineGroupInvite() {
        return this.httpResponse.getBody(true);
    }

    cancelGroupInvite() {
        return this.httpResponse.getBody(true);
    }

    cancelAllGroupInvite() {
        return this.httpResponse.getBody(true);
    }

    transferGroup() {
        return this.httpResponse.getBody(true);
    }

    raidReady() {
        return this.httpResponse.getBody(true);
    }

    notRaidReady() {
        return this.httpResponse.getBody(true);
    }

    putMetrics(_req: FastifyRequest<{ Body: IPutMetricsRequestData }>) {
        return this.httpResponse.nullResponse();
    }

    eventDisconnect(_req: FastifyRequest<{ Body: IPutMetricsRequestData }>) {
        return this.httpResponse.nullResponse();
    }

    getMetrics() {
        return this.httpResponse.getBody<IMetrics>(this.databaseService.getMatch().metrics);
    }

    getRaidConfiguration(req: FastifyRequest<{ Body: IGetRaidConfigurationRequestData }>) {
        this.matchController.configureOfflineRaid(req.body, req.sessionId);
        return this.httpResponse.nullResponse();
    }

    getConfigurationByProfile() {
        return this.httpResponse.nullResponse();
    }

    removePlayerFromGroup() {
        return this.httpResponse.getBody(true);
    }

    startLocalRaid(req: FastifyRequest<{ Body: IStartLocalRaidRequestData }>) {
        return this.httpResponse.getBody<IStartLocalRaidResponseData>(
            this.matchController.startLocalRaid(req.sessionId, req.body)
        );
    }

    endLocalRaid(req: FastifyRequest<{ Body: IEndLocalRaidRequestData }>) {
        this.matchController.endLocalRaid(req.sessionId, req.body);
        return this.httpResponse.nullResponse();
    }

    registerRoutes(fastify: FastifyInstance) {
        fastify.get("/client/match/available", this.serverAvailable.bind(this));
        fastify.get("/client/match/updatePing", this.updatePing.bind(this));
        fastify.get("/client/match/join", this.joinMatch.bind(this));
        fastify.get("/client/match/exit", this.exitMatch.bind(this));
        fastify.get("/client/match/group/delete", this.deleteGroup.bind(this));
        fastify.get("/client/match/group/leave", this.leaveGroup.bind(this));
        fastify.get("/client/match/group/status", this.getGroupStatus.bind(this));
        fastify.get("/client/match/group/start_game", this.joinMatch.bind(this));
        fastify.get("/client/match/group/exit_from_menu", this.exitFromMenu.bind(this));
        fastify.get("/client/match/group/current", this.groupCurrent.bind(this));
        fastify.get("/client/match/group/looking/start", this.startGroupSearch.bind(this));
        fastify.get("/client/match/group/looking/stop", this.stopGroupSearch.bind(this));
        fastify.get("/client/match/group/invite/send", this.sendGroupInvite.bind(this));
        fastify.get("/client/match/group/invite/accept", this.acceptGroupInvite.bind(this));
        fastify.get("/client/match/group/invite/decline", this.declineGroupInvite.bind(this));
        fastify.get("/client/match/group/invite/cancel", this.cancelGroupInvite.bind(this));
        fastify.get("/client/match/group/invite/cancel-all", this.cancelAllGroupInvite.bind(this));
        fastify.get("/client/match/group/transfer", this.transferGroup.bind(this));
        fastify.get("/client/match/group/raid/ready", this.raidReady.bind(this));
        fastify.get("/client/match/group/raid/not-ready", this.notRaidReady.bind(this));
        fastify.get("/client/putMetrics", this.putMetrics.bind(this));
        fastify.get("/client/analytics/event-disconnect", this.eventDisconnect.bind(this));
        fastify.get("/client/getMetricsConfig", this.getMetrics.bind(this));
        fastify.get("/client/raid/configuration", this.getRaidConfiguration.bind(this));
        fastify.get("/client/raid/configuration-by-profile", this.getConfigurationByProfile.bind(this));
        fastify.get("/client/match/group/player/remove", this.removePlayerFromGroup.bind(this));
        fastify.get("/client/match/local/start", this.startLocalRaid.bind(this));
        fastify.get("/client/match/local/end", this.endLocalRaid.bind(this));
    }
}
