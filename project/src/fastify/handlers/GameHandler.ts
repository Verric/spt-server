import { GameController } from "@spt/controllers/GameController";
import { IGameLogoutResponseData } from "@spt/models/eft/game/IGameLogoutResponseData";
import { IGameModeRequestData } from "@spt/models/eft/game/IGameModeRequestData";
import { IGetRaidTimeRequest } from "@spt/models/eft/game/IGetRaidTimeRequest";
import { SaveServer } from "@spt/servers/SaveServer";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { Watermark } from "@spt/utils/Watermark";
import { FastifyInstance, FastifyRequest } from "fastify";
import { inject } from "tsyringe";

//TODO this callback had an OnLoad handler
export class GameHandler {
    private httpResponse: HttpResponseUtil;
    private watermark: Watermark;
    private saveServer: SaveServer;
    private gameController: GameController;

    constructor(
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("Watermark") watermark: Watermark,
        @inject("SaveServer") saveServer: SaveServer,
        @inject("GameController") gameController: GameController
    ) {
        this.httpResponse = httpResponse;
        this.watermark = watermark;
        this.saveServer = saveServer;
        this.gameController = gameController;
    }

    versionValidate() {
        return this.httpResponse.nullResponse();
    }

    gameStart(req: FastifyRequest) {
        const nowUtcMs = Date.parse(new Date().toUTCString());
        this.gameController.gameStart(req.url, {}, req.sessionId, nowUtcMs);
        return this.httpResponse.getBody({ utc_time: nowUtcMs / 1000 });
    }

    async gameLogout(req: FastifyRequest) {
        await this.saveServer.saveProfile(req.sessionId);
        return this.httpResponse.getBody<IGameLogoutResponseData>({ status: "ok" });
    }

    getGameConfig(req: FastifyRequest) {
        return this.httpResponse.getBody(this.gameController.getGameConfig(req.sessionId));
    }

    getGameMode(req: FastifyRequest<{ Body: IGameModeRequestData }>) {
        return this.httpResponse.getBody(this.gameController.getGameMode(req.sessionId, req.body));
    }

    getServer(req: FastifyRequest) {
        return this.httpResponse.getBody(this.gameController.getServer(req.sessionId));
    }

    getCurrentGroup(req: FastifyRequest) {
        return this.httpResponse.getBody(this.gameController.getCurrentGroup(req.sessionId));
    }

    validateGameVersion(req: FastifyRequest) {
        return this.httpResponse.getBody(this.gameController.getValidGameVersion(req.sessionId));
    }

    gameKeepalive(req: FastifyRequest) {
        return this.httpResponse.getBody(this.gameController.getKeepAlive(req.sessionId));
    }

    getVersion() {
        return this.httpResponse.noBody({ Version: this.watermark.getInGameVersionLabel() });
    }

    reportNickname() {
        return this.httpResponse.nullResponse();
    }

    getRaidTime(req: FastifyRequest<{ Body: IGetRaidTimeRequest }>) {
        return this.httpResponse.noBody(this.gameController.getRaidTime(req.sessionId, req.body));
    }

    getSurvey(req: FastifyRequest) {
        return this.httpResponse.getBody(this.gameController.getSurvey(req.sessionId));
    }

    getSurveyView() {
        return this.httpResponse.nullResponse();
    }

    sendSurveyOpinion() {
        return this.httpResponse.nullResponse();
    }

    registerRoutes(fastify: FastifyInstance) {
        fastify.get("/client/game/config", this.getGameConfig.bind(this));
        fastify.get("/client/game/mode", this.getGameMode.bind(this));
        fastify.get("/client/server/list", this.getServer.bind(this));
        fastify.get("/client/match/group/current", this.getCurrentGroup.bind(this));
        fastify.get("/client/game/version/validate", this.versionValidate.bind(this));
        fastify.get("/client/game/start", this.gameStart.bind(this));
        fastify.get("/client/game/logout", this.gameLogout.bind(this));
        fastify.get("/client/checkVersion", this.validateGameVersion.bind(this));
        fastify.get("/client/game/keepalive", this.gameKeepalive.bind(this));
        fastify.get("/singleplayer/settings/version", this.getVersion.bind(this));
        fastify.get("/client/reports/lobby/send", this.reportNickname.bind(this));
        fastify.get("/client/report/send", this.reportNickname.bind(this));
        fastify.get("/singleplayer/settings/getRaidTime", this.getRaidTime.bind(this));
        fastify.get("/client/survey", this.getSurvey.bind(this));
        fastify.get("/client/survey/view", this.getSurveyView.bind(this));
        fastify.get("/client/survey/opinion", this.sendSurveyOpinion.bind(this));
    }
}
