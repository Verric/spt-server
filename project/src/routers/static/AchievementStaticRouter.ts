import { AchievementCallbacks } from "@spt/callbacks/AchievementCallbacks";
import { StaticRouter } from "@spt/di/Router";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { ICompletedAchievementsResponse } from "@spt/models/eft/profile/ICompletedAchievementsResponse";
import { IGetAchievementsResponse } from "@spt/models/eft/profile/IGetAchievementsResponse";
import { inject, injectable } from "tsyringe";

@injectable()
export class AchievementStaticRouter extends StaticRouter {
    constructor(@inject("AchievementCallbacks") achievementCallbacks: AchievementCallbacks) {
        super([
            {
                url: "/client/achievement/list",
                action: async (url, info, sessionID): Promise<IGetBodyResponseData<IGetAchievementsResponse>> => {
                    return achievementCallbacks.getAchievements(url, info, sessionID);
                },
            },

            {
                url: "/client/achievement/statistic",
                action: async (url, info, sessionID): Promise<IGetBodyResponseData<ICompletedAchievementsResponse>> => {
                    return achievementCallbacks.statistic(url, info, sessionID);
                },
            },
        ]);
    }
}
