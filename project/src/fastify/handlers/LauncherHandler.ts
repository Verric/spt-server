import { LauncherController } from "@spt/controllers/LauncherController";
import { IChangeRequestData } from "@spt/models/eft/launcher/IChangeRequestData";
import { ILoginRequestData } from "@spt/models/eft/launcher/ILoginRequestData";
import { IRegisterData } from "@spt/models/eft/launcher/IRegisterData";
import { IRemoveProfileData } from "@spt/models/eft/launcher/IRemoveProfileData";
import { SaveServer } from "@spt/servers/SaveServer";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { Watermark } from "@spt/utils/Watermark";
import { FastifyInstance, FastifyRequest } from "fastify";
import { inject } from "tsyringe";

export class LauncherHandler {
    private httpResponse: HttpResponseUtil;
    private launcherController: LauncherController;
    private saveServer: SaveServer;
    private watermark: Watermark;

    constructor(
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("LauncherController") launcherController: LauncherController,
        @inject("SaveServer") saveServer: SaveServer,
        @inject("Watermark") watermark: Watermark
    ) {
        this.httpResponse = httpResponse;
        this.launcherController = launcherController;
        this.saveServer = saveServer;
        this.watermark = watermark;
    }

    ping() {
        return this.httpResponse.noBody("pong!");
    }

    connect() {
        return this.httpResponse.noBody(this.launcherController.connect());
    }

    login(req: FastifyRequest<{ Body: ILoginRequestData }>) {
        const output = this.launcherController.login(req.body);
        return !output ? "FAILED" : output;
    }

    async register(req: FastifyRequest<{ Body: IRegisterData }>) {
        const ok = await this.launcherController.register(req.body);
        return !ok ? "FAILED" : "OK";
    }

    get(req: FastifyRequest<{ Body: ILoginRequestData }>) {
        const output = this.launcherController.find(this.launcherController.login(req.body));
        return this.httpResponse.noBody(output);
    }

    changeUsername(req: FastifyRequest<{ Body: IChangeRequestData }>) {
        const ok = this.launcherController.changeUsername(req.body);
        return !ok ? "FAILED" : "OK";
    }

    changePassword(req: FastifyRequest<{ Body: IChangeRequestData }>) {
        const ok = this.launcherController.changePassword(req.body);
        return !ok ? "FAILED" : "OK";
    }

    wipe(req: FastifyRequest<{ Body: IRegisterData }>) {
        const ok = this.launcherController.wipe(req.body);
        return !ok ? "FAILED" : "OK";
    }

    async removeProfile(req: FastifyRequest<{ Body: IRemoveProfileData }>) {
        return this.httpResponse.noBody(await this.saveServer.removeProfile(req.sessionId));
    }

    getCompatibleTarkovVersion() {
        return this.httpResponse.noBody(this.launcherController.getCompatibleTarkovVersion());
    }

    getServerVersion() {
        return this.httpResponse.noBody(this.watermark.getVersionTag());
    }

    getLoadedServerMods() {
        return this.httpResponse.noBody(this.launcherController.getLoadedServerMods());
    }

    getServerModsProfileUsed(req: FastifyRequest) {
        return this.httpResponse.noBody(this.launcherController.getServerModsProfileUsed(req.sessionId));
    }

    registerRoutes(fastify: FastifyInstance) {
        fastify.get("/launcher/ping", this.ping.bind(this));
        fastify.get("/launcher/server/connect", this.connect.bind(this));
        fastify.get("/launcher/profile/login", this.login.bind(this));
        fastify.get("/launcher/profile/register", this.register.bind(this));
        fastify.get("/launcher/profile/get", this.get.bind(this));
        fastify.get("/launcher/profile/change/username", this.changeUsername.bind(this));
        fastify.get("/launcher/profile/change/password", this.changePassword.bind(this));
        fastify.get("/launcher/profile/change/wipe", this.wipe.bind(this));
        fastify.get("/launcher/profile/remove", this.removeProfile.bind(this));
        fastify.get("/launcher/profile/compatibleTarkovVersion", this.getCompatibleTarkovVersion.bind(this));
        fastify.get("/launcher/server/version", this.getServerVersion.bind(this));
        fastify.get("/launcher/server/loadedServerMods", this.getLoadedServerMods.bind(this));
        fastify.get("/launcher/server/serverModsUsedByProfile", this.getServerModsProfileUsed.bind(this));
    }
}
