import { NotifierController } from "@spt/controllers/NotifierController";
import { HttpServerHelper } from "@spt/helpers/HttpServerHelper";
import { INotifierChannel } from "@spt/models/eft/notifier/INotifier";
import { ISelectProfileResponse } from "@spt/models/eft/notifier/ISelectProfileResponse";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { JsonUtil } from "@spt/utils/JsonUtil";
import { FastifyInstance, FastifyRequest } from "fastify";
import { inject } from "tsyringe";

export class NotifierHandler {
    private httpServerHelper: HttpServerHelper;
    private httpResponse: HttpResponseUtil;
    private jsonUtil: JsonUtil;
    private notifierController: NotifierController;

    constructor(
        @inject("HttpServerHelper") httpServerHelper: HttpServerHelper,
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("JsonUtil") jsonUtil: JsonUtil,
        @inject("NotifierController") notifierController: NotifierController
    ) {
        this.httpServerHelper = httpServerHelper;
        this.httpResponse = httpResponse;
        this.jsonUtil = jsonUtil;
        this.notifierController = notifierController;
    }

    // leave-as-is helper for long-poll transports
    sendNotification(_sessionID: string, req: any, resp: any, _data: any): void {
        const splittedUrl = req.url.split("/");
        const tmpSessionID = splittedUrl[splittedUrl.length - 1].split("?last_id")[0];

        this.notifierController
            .notifyAsync(tmpSessionID)
            .then((messages: any) => messages.map((m: any) => this.jsonUtil.serialize(m)).join("\n"))
            .then((text) => this.httpServerHelper.sendTextJson(resp, text));
    }

    // GET /push/notifier/get and /push/notifier/getwebsocket
    getNotifier() {
        return this.httpResponse.emptyArrayResponse();
    }

    // POST /client/notifier/channel/create
    createNotifierChannel(req: FastifyRequest) {
        return this.httpResponse.getBody<INotifierChannel>(this.notifierController.getChannel(req.sessionId));
    }

    // POST /client/game/profile/select
    selectProfile() {
        return this.httpResponse.getBody<ISelectProfileResponse>({ status: "ok" });
    }

    // GET /?last_id and /notifierServer
    notify() {
        return "NOTIFY";
    }

    registerRoutes(fastify: FastifyInstance) {
        fastify.get("/?last_id", this.notify.bind(this));
        fastify.get("/notifierServer", this.notify.bind(this));
        fastify.get("/push/notifier/get/", this.getNotifier.bind(this));
        fastify.get("/push/notifier/getwebsocket/", this.getNotifier.bind(this));
        fastify.get("/client/notifier/channel/create", this.createNotifierChannel.bind(this));
        fastify.get("/client/game/profile/select", this.selectProfile.bind(this));
    }
}
