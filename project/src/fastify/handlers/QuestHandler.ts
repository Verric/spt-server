import { QuestController } from "@spt/controllers/QuestController";
import { RepeatableQuestController } from "@spt/controllers/RepeatableQuestController";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IQuest } from "@spt/models/eft/common/tables/IQuest";
import { IPmcDataRepeatableQuest } from "@spt/models/eft/common/tables/IRepeatableQuests";
import { IAcceptQuestRequestData } from "@spt/models/eft/quests/IAcceptQuestRequestData";
import { ICompleteQuestRequestData } from "@spt/models/eft/quests/ICompleteQuestRequestData";
import { IHandoverQuestRequestData } from "@spt/models/eft/quests/IHandoverQuestRequestData";
import { IListQuestsRequestData } from "@spt/models/eft/quests/IListQuestsRequestData";
import { IRepeatableQuestChangeRequest } from "@spt/models/eft/quests/IRepeatableQuestChangeRequest";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { FastifyInstance, FastifyRequest } from "fastify";
import { inject } from "tsyringe";

export class QuestHandler {
    private httpResponse: HttpResponseUtil;
    private questController: QuestController;
    private repeatableQuestController: RepeatableQuestController;

    constructor(
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("QuestController") questController: QuestController,
        @inject("RepeatableQuestController") repeatableQuestController: RepeatableQuestController
    ) {
        this.httpResponse = httpResponse;
        this.questController = questController;
        this.repeatableQuestController = repeatableQuestController;
    }

    // item-event callbacks (left as-is)
    changeRepeatableQuest(pmcData: IPmcData, body: IRepeatableQuestChangeRequest, sessionID: string) {
        return this.repeatableQuestController.changeRepeatableQuest(pmcData, body, sessionID);
    }

    acceptQuest(pmcData: IPmcData, body: IAcceptQuestRequestData, sessionID: string) {
        if (body.type === "repeatable") {
            return this.questController.acceptRepeatableQuest(pmcData, body, sessionID);
        }
        return this.questController.acceptQuest(pmcData, body, sessionID);
    }

    completeQuest(pmcData: IPmcData, body: ICompleteQuestRequestData, sessionID: string) {
        return this.questController.completeQuest(pmcData, body, sessionID);
    }

    handoverQuest(pmcData: IPmcData, body: IHandoverQuestRequestData, sessionID: string) {
        return this.questController.handoverQuest(pmcData, body, sessionID);
    }

    // static routes
    listQuests(req: FastifyRequest<{ Body: IListQuestsRequestData }>) {
        return this.httpResponse.getBody<IQuest[]>(this.questController.getClientQuests(req.sessionId));
    }

    activityPeriods(req: FastifyRequest) {
        return this.httpResponse.getBody<IPmcDataRepeatableQuest[]>(
            this.repeatableQuestController.getClientRepeatableQuests(req.sessionId)
        );
    }

    registerRoutes(fastify: FastifyInstance) {
        fastify.get("/client/quest/list", this.listQuests.bind(this));
        fastify.get("/client/repeatalbeQuests/activityPeriods", this.activityPeriods.bind(this));
    }
}
