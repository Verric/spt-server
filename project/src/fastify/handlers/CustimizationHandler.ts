import { CustomizationController } from "@spt/controllers/CustomizationController";
import { SaveServer } from "@spt/servers/SaveServer";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { FastifyInstance, FastifyRequest } from "fastify";
import { inject } from "tsyringe";

export class CustomizationHandler {
    private customizationController: CustomizationController;
    private saveServer: SaveServer;
    private httpResponse: HttpResponseUtil;

    constructor(
        @inject("CustomizationController") customizationController: CustomizationController,
        @inject("SaveServer") saveServer: SaveServer,
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil
    ) {
        this.customizationController = customizationController;
        this.saveServer = saveServer;
        this.httpResponse = httpResponse;
    }

    getCustomisationUnlocks(req: FastifyRequest) {
        return this.httpResponse.getBody(this.saveServer.getProfile(req.sessionId).customisationUnlocks);
    }

    getHideoutCustomisation(_req: FastifyRequest) {
        return this.httpResponse.getBody(this.customizationController.getHideoutCustomisation());
    }

    getStorage(req: FastifyRequest) {
        return this.httpResponse.getBody(this.customizationController.getCustomisationStorage(req.sessionId));
    }

    registerRoutes(fastify: FastifyInstance) {
        fastify.get("/client/trading/customization/storage", this.getCustomisationUnlocks.bind(this));
        fastify.get("/client/hideout/customization/offer/list", this.getHideoutCustomisation.bind(this));
        fastify.get("/client/customization/storage", this.getStorage.bind(this));
    }
}
