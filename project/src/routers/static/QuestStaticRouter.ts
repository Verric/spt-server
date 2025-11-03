import { QuestCallbacks } from "@spt/callbacks/QuestCallbacks";
import { StaticRouter } from "@spt/di/Router";
import { IQuest } from "@spt/models/eft/common/tables/IQuest";
import { IPmcDataRepeatableQuest } from "@spt/models/eft/common/tables/IRepeatableQuests";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { inject, injectable } from "tsyringe";

@injectable()
export class QuestStaticRouter extends StaticRouter {
    constructor(@inject("QuestCallbacks") protected questCallbacks: QuestCallbacks) {
        super([
            {
                url: "/client/quest/list",
                action: async (url, info, sessionID): Promise<IGetBodyResponseData<IQuest[]>> => {
                    return this.questCallbacks.listQuests(url, info, sessionID);
                },
            },
            {
                url: "/client/repeatalbeQuests/activityPeriods",
                action: async (url, info, sessionID): Promise<IGetBodyResponseData<IPmcDataRepeatableQuest[]>> => {
                    return this.questCallbacks.activityPeriods(url, info, sessionID);
                },
            },
        ]);
    }
}
