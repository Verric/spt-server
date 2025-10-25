import { ICompletedAchievementsResponse } from "@spt/models/eft/profile/ICompletedAchievementsResponse";
import { IGetAchievementsResponse } from "@spt/models/eft/profile/IGetAchievementsResponse";
import { DatabaseService } from "@spt/services/DatabaseService";
import { inject, injectable } from "tsyringe";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";

@injectable()
export class AchievementController {
    private httpResponse: HttpResponseUtil;
    private databaseService: DatabaseService;

    constructor(
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("DatabaseService") databaseService: DatabaseService
    ) {
        this.databaseService = databaseService;
        this.httpResponse = httpResponse;
    }

    /**
     * Handle client/achievement/list
     */
    public getAchievements(): IGetBodyResponseData<IGetAchievementsResponse> {
        const result = { elements: this.databaseService.getAchievements() };
        return this.httpResponse.getBody(result);
    }

    /**
     * Handle client/achievement/statistic
     */
    public statistic(): IGetBodyResponseData<ICompletedAchievementsResponse> {
        const achievements = this.databaseService.getAchievements();
        const stats: Record<string, number> = {};
        for (const achievement of achievements) {
            stats[achievement.id] = 0;
        }
        const result = { elements: stats };

        return this.httpResponse.getBody(result);
    }
}
