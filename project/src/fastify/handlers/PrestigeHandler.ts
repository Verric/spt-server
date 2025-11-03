import { PrestigeController } from "@spt/controllers/PrestigeController";
import { IObtainPrestigeRequest } from "@spt/models/eft/prestige/IObtainPrestigeRequest";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { FastifyInstance, FastifyRequest } from "fastify";
import { inject } from "tsyringe";

export class PrestigeHandler {
    private httpResponse: HttpResponseUtil;
    private prestigeController: PrestigeController;

    constructor(
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("PrestigeController") prestigeController: PrestigeController
    ) {
        this.httpResponse = httpResponse;
        this.prestigeController = prestigeController;
    }

    getPrestige() {
        return this.httpResponse.getBody(this.prestigeController.getPrestige());
    }

    async obtainPrestige(req: FastifyRequest<{ Body: IObtainPrestigeRequest[] }>) {
        await this.prestigeController.obtainPrestige(req.sessionId, req.body);
        return this.httpResponse.nullResponse();
    }

    registerRoutes(fastify: FastifyInstance) {
        fastify.get("/client/prestige/list", this.getPrestige.bind(this));
        fastify.get("/client/prestige/obtain", this.obtainPrestige.bind(this));
    }
}
