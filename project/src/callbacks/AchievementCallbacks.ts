import { AchievementController } from "@spt/controllers/AchievementController";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { ICompletedAchievementsResponse } from "@spt/models/eft/profile/ICompletedAchievementsResponse";
import { IGetAchievementsResponse } from "@spt/models/eft/profile/IGetAchievementsResponse";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { inject, injectable } from "tsyringe";

@injectable()
export class AchievementCallbacks {
    private achievementController: AchievementController;
    private httpResponse: HttpResponseUtil;

    constructor(
        @inject("AchievementController") achievementController: AchievementController,
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil
    ) {
        this.achievementController = achievementController;
        this.httpResponse = httpResponse;
    }

    /**
     * Handle client/achievement/list
     */
    public getAchievements(
        _url: string,
        _info: IEmptyRequestData,
        sessionID: string
    ): IGetBodyResponseData<IGetAchievementsResponse> {
        return this.httpResponse.getBody(this.achievementController.getAchievements(sessionID));
    }

    /**
     * Handle client/achievement/statistic
     */
    public statistic(
        _url: string,
        _info: IEmptyRequestData,
        sessionID: string
    ): IGetBodyResponseData<ICompletedAchievementsResponse> {
        return this.httpResponse.getBody(this.achievementController.getAchievementStatistics(sessionID));
    }
}
