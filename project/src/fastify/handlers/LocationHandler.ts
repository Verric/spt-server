import { LocationController } from "@spt/controllers/LocationController";
import { IGetAirdropLootRequest } from "@spt/models/eft/location/IGetAirdropLootRequest";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { FastifyInstance, FastifyRequest } from "fastify";
import { inject } from "tsyringe";

export class LocationHandler {
    private httpResponse: HttpResponseUtil;
    private locationController: LocationController;

    constructor(
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("LocationController") locationController: LocationController
    ) {
        this.httpResponse = httpResponse;
        this.locationController = locationController;
    }

    getLocationData(req: FastifyRequest) {
        return this.httpResponse.getBody(this.locationController.generateAll(req.sessionId));
    }

    getAirdropLoot(req: FastifyRequest<{ Body: IGetAirdropLootRequest }>) {
        return this.httpResponse.getBody(this.locationController.getAirdropLoot(req.body));
    }

    registerRoutes(fastify: FastifyInstance) {
        fastify.get("/client/locations", this.getLocationData.bind(this));
        fastify.get("/client/airdrop/loot", this.getAirdropLoot.bind(this));
    }
}
