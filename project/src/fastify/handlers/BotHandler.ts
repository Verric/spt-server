import { ApplicationContext } from "@spt/context/ApplicationContext";
import { ContextVariableType } from "@spt/context/ContextVariableType";
import { BotController } from "@spt/controllers/BotController";
import { IGenerateBotsRequestData } from "@spt/models/eft/bot/IGenerateBotsRequestData";
import { IGetRaidConfigurationRequestData } from "@spt/models/eft/match/IGetRaidConfigurationRequestData";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import type { FastifyInstance, FastifyRequest } from "fastify";
import { inject } from "tsyringe";

export class BotHandler {
    private botController: BotController;
    private httpResponse: HttpResponseUtil;
    private applicationContext: ApplicationContext;

    constructor(
        @inject("BotController") botController: BotController,
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("ApplicationContext") applicationContext: ApplicationContext
    ) {
        this.botController = botController;
        this.httpResponse = httpResponse;
        this.applicationContext = applicationContext;
    }

    generateBots(req: FastifyRequest<{ Body: IGenerateBotsRequestData }>) {
        return this.httpResponse.getBody(this.botController.generate(req.sessionId, req.body));
    }

    /**
     * Is called by client to define each bot roles wave limit
     * @returns string
     */
    // TODO add type to botType instead of string
    getBotLimit(req: FastifyRequest<{ Params: { botType: string } }>) {
        return this.httpResponse.noBody(this.botController.getBotPresetGenerationLimit(req.params.botType));
    }

    getBotDifficulty(req: FastifyRequest<{ Params: { botType: string; difficulty: string } }>) {
        const { botType, difficulty } = req.params;
        if (difficulty === "core") {
            return this.httpResponse.noBody(this.botController.getBotCoreDifficulty());
        }

        const raidConfig = this.applicationContext
            .getLatestValue(ContextVariableType.RAID_CONFIGURATION)
            ?.getValue<IGetRaidConfigurationRequestData>();

        return this.httpResponse.noBody(this.botController.getBotDifficulty(botType, difficulty, raidConfig));
    }
    /**
     * @returns dictionary of every bot and its diffiulty settings
     */
    getAllBotDifficulties() {
        return this.httpResponse.noBody(this.botController.getAllBotDifficulties());
    }

    getBotCap(req: FastifyRequest<{ Params: { location: string } }>) {
        return this.httpResponse.noBody(this.botController.getBotCap(req.params.location));
    }

    getBotBehaviours() {
        return this.httpResponse.noBody(this.botController.getAiBotBrainTypes());
    }

    registerRoutes(fastify: FastifyInstance) {
        fastify.get("/client/game/bot/generate", this.generateBots.bind(this));
        fastify.get("/singleplayer/settings/bot/limit/:botType", this.getBotLimit.bind(this));
        fastify.get("/singleplayer/settings/bot/difficulty/:botType/:difficulty", this.getBotDifficulty.bind(this));
        fastify.get("/singleplayer/settings/bot/difficulties", this.getAllBotDifficulties.bind(this));
        fastify.get("/singleplayer/settings/bot/maxCap/:location", this.getBotCap.bind(this));
        fastify.get("/singleplayer/settings/bot/getBotBehaviours", this.getBotBehaviours.bind(this));
    }
}
