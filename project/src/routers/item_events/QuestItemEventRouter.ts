import { QuestCallbacks } from "@spt/callbacks/QuestCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "@spt/di/Router";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import type { ILogger } from "@spt/models/spt/utils/ILogger";

import { inject, injectable } from "tsyringe";

@injectable()
export class QuestItemEventRouter extends ItemEventRouterDefinition {
    protected logger: ILogger;
    protected questCallbacks: QuestCallbacks;
    constructor(@inject("PrimaryLogger") logger: ILogger, @inject("QuestCallbacks") questCallbacks: QuestCallbacks) {
        super();
        this.logger = logger;
        this.questCallbacks = questCallbacks;
    }

    public override getHandledRoutes(): HandledRoute[] {
        return [
            { route: "QuestAccept", dynamic: false },
            { route: "QuestComplete", dynamic: false },
            { route: "QuestHandover", dynamic: false },
            { route: "RepeatableQuestChange", dynamic: false },
        ];
    }

    public override async handleItemEvent(
        eventAction: "QuestAccept" | "QuestComplete" | "QuestHandover" | "RepeatableQuestChange",
        pmcData: IPmcData,
        body: any,
        sessionID: string
    ): Promise<IItemEventRouterResponse> {
        this.logger.debug(`${eventAction} ${body.qid}`);
        switch (eventAction) {
            case "QuestAccept":
                return this.questCallbacks.acceptQuest(pmcData, body, sessionID);
            case "QuestComplete":
                return this.questCallbacks.completeQuest(pmcData, body, sessionID);
            case "QuestHandover":
                return this.questCallbacks.handoverQuest(pmcData, body, sessionID);
            case "RepeatableQuestChange":
                return this.questCallbacks.changeRepeatableQuest(pmcData, body, sessionID);
        }
    }
}
