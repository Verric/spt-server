import { AchievementController } from "@spt/controllers/AchievementController";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { inject } from "tsyringe";

export class AchievementHandler {
    private achievementController: AchievementController;
    private httpResponse: HttpResponseUtil;

    constructor(
        @inject("AchievementController") achievementController: AchievementController,
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil
    ) {
        this.achievementController = achievementController;
        this.httpResponse = httpResponse;
    }

    getAchievements(_req: FastifyRequest, _reply: FastifyReply) {
        return this.httpResponse.getBody(this.achievementController.getAchievements());
    }

    getStatistics(_req: FastifyRequest, _reply: FastifyReply) {
        return this.httpResponse.getBody(this.achievementController.getAchievementStatistics());
    }

    registerRoutes(fastify: FastifyInstance) {
        fastify.get("/client/achievement/list", this.getAchievements.bind(this));
        fastify.get("/client/achievement/statistic", this.getStatistics.bind(this));
    }
}
