import { ApplicationContext } from "@spt/context/ApplicationContext";
import { ContextVariableType } from "@spt/context/ContextVariableType";
import { BotController } from "@spt/controllers/BotController";
import { IGenerateBotsRequestData } from "@spt/models/eft/bot/IGenerateBotsRequestData";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { IBotBase } from "@spt/models/eft/common/tables/IBotBase";
import { IDifficulties } from "@spt/models/eft/common/tables/IBotType";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { IGetRaidConfigurationRequestData } from "@spt/models/eft/match/IGetRaidConfigurationRequestData";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { inject, injectable } from "tsyringe";

@injectable()
export class BotCallbacks {
    protected botController: BotController;
    protected httpResponse: HttpResponseUtil;
    protected applicationContext: ApplicationContext;
    constructor(
        @inject("BotController") botController: BotController,
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("ApplicationContext") applicationContext: ApplicationContext,
    ) {
        this.botController = botController;
        this.httpResponse = httpResponse;
        this.applicationContext = applicationContext;
    }

    /**
     * Handle singleplayer/settings/bot/limit
     * Is called by client to define each bot roles wave limit
     * @returns string
     */
    public getBotLimit(url: string, _info: IEmptyRequestData, _sessionID: string): string {
        const splittedUrl = url.split("/");
        const type = splittedUrl[splittedUrl.length - 1];
        return this.httpResponse.noBody(this.botController.getBotPresetGenerationLimit(type));
    }

    /**
     * Handle singleplayer/settings/bot/difficulty
     * @returns string
     */
    public getBotDifficulty(url: string, _info: IEmptyRequestData, _sessionID: string): string {
        const splittedUrl = url.split("/");
        const type = splittedUrl[splittedUrl.length - 2].toLowerCase();
        const difficulty = splittedUrl[splittedUrl.length - 1];
        if (difficulty === "core") {
            return this.httpResponse.noBody(this.botController.getBotCoreDifficulty());
        }

        const raidConfig = this.applicationContext
            .getLatestValue(ContextVariableType.RAID_CONFIGURATION)
            ?.getValue<IGetRaidConfigurationRequestData>();

        return this.httpResponse.noBody(this.botController.getBotDifficulty(type, difficulty, raidConfig));
    }

    /**
     * Handle singleplayer/settings/bot/difficulties
     * @returns dictionary of every bot and its diffiulty settings
     */
    public getAllBotDifficulties(
        _url: string,
        _info: IEmptyRequestData,
        _sessionID: string,
    ): Record<string, IDifficulties> {
        return this.httpResponse.noBody(this.botController.getAllBotDifficulties());
    }

    /**
     * Handle client/game/bot/generate
     * @returns IGetBodyResponseData
     */
    public async generateBots(
        _url: string,
        info: IGenerateBotsRequestData,
        sessionID: string,
    ): Promise<IGetBodyResponseData<IBotBase[]>> {
        return this.httpResponse.getBody(await this.botController.generate(sessionID, info));
    }

    /**
     * Handle singleplayer/settings/bot/maxCap
     * @returns string
     */
    public getBotCap(url: string, _info: IEmptyRequestData, _sessionID: string): string {
        const splitUrl = url.split("/");
        const location = splitUrl[splitUrl.length - 1];
        return this.httpResponse.noBody(this.botController.getBotCap(location));
    }

    /**
     * Handle singleplayer/settings/bot/getBotBehaviours
     * @returns string
     */
    public getBotBehaviours(): string {
        return this.httpResponse.noBody(this.botController.getAiBotBrainTypes());
    }
}
