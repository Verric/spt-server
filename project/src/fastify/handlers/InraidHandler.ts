import { InraidController } from "@spt/controllers/InraidController";
import { IRegisterPlayerRequestData } from "@spt/models/eft/inRaid/IRegisterPlayerRequestData";
import { IScavSaveRequestData } from "@spt/models/eft/inRaid/IScavSaveRequestData";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { FastifyInstance, FastifyRequest } from "fastify";
import { inject } from "tsyringe";

export class InraidHandler {
    private inraidController: InraidController;
    private httpResponse: HttpResponseUtil;

    constructor(
        @inject("InraidController") inraidController: InraidController,
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil
    ) {
        this.inraidController = inraidController;
        this.httpResponse = httpResponse;
    }

    registerPlayer(req: FastifyRequest<{ Body: IRegisterPlayerRequestData }>) {
        this.inraidController.addPlayer(req.sessionId, req.body);
        return this.httpResponse.nullResponse();
    }

    saveProgress(req: FastifyRequest<{ Body: IScavSaveRequestData }>) {
        this.inraidController.savePostRaidProfileForScav(req.body, req.sessionId);
        return this.httpResponse.nullResponse();
    }

    getRaidMenuSettings() {
        return this.httpResponse.noBody(this.inraidController.getInraidConfig().raidMenuSettings);
    }

    getTraitorScavHostileChance() {
        return this.httpResponse.noBody(this.inraidController.getTraitorScavHostileChance());
    }

    getBossTypes() {
        return this.httpResponse.noBody(this.inraidController.getBossTypes());
    }

    registerRoutes(fastify: FastifyInstance) {
        fastify.get("/raid/profile/scavsave", this.saveProgress.bind(this));
        fastify.get("/singleplayer/settings/raid/menu", this.getRaidMenuSettings.bind(this));
        fastify.get("/singleplayer/scav/traitorscavhostile", this.getTraitorScavHostileChance.bind(this));
        fastify.get("/singleplayer/bosstypes", this.getBossTypes.bind(this));
        fastify.get("/client/location/getLocalloot", this.registerPlayer.bind(this));
    }
}
