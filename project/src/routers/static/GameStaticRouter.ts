import { GameCallbacks } from "@spt/callbacks/GameCallbacks";
import { StaticRouter } from "@spt/di/Router";
import { ICheckVersionResponse } from "@spt/models/eft/game/ICheckVersionResponse";
import { ICurrentGroupResponse } from "@spt/models/eft/game/ICurrentGroupResponse";
import { IGameConfigResponse } from "@spt/models/eft/game/IGameConfigResponse";
import { IGameKeepAliveResponse } from "@spt/models/eft/game/IGameKeepAliveResponse";
import { IGameLogoutResponseData } from "@spt/models/eft/game/IGameLogoutResponseData";
import { IGameModeResponse } from "@spt/models/eft/game/IGameModeResponse";
import { IGameStartResponse } from "@spt/models/eft/game/IGameStartResponse";
import { IGetRaidTimeResponse } from "@spt/models/eft/game/IGetRaidTimeResponse";
import { ISendReportRequest } from "@spt/models/eft/game/ISendReportRequest";
import { IServerDetails } from "@spt/models/eft/game/IServerDetails";
import { ISurveyResponseData } from "@spt/models/eft/game/ISurveyResponseData";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { inject, injectable } from "tsyringe";

@injectable()
export class GameStaticRouter extends StaticRouter {
    constructor(
        @inject("HttpResponseUtil") protected httpResponse: HttpResponseUtil,
        @inject("GameCallbacks") protected gameCallbacks: GameCallbacks
    ) {
        super([
            {
                url: "/client/game/config",
                action: async (url, info, sessionID): Promise<IGetBodyResponseData<IGameConfigResponse>> => {
                    return this.gameCallbacks.getGameConfig(url, info, sessionID);
                },
            },
            {
                url: "/client/game/mode",
                action: async (url, info, sessionID): Promise<IGetBodyResponseData<IGameModeResponse>> => {
                    return this.gameCallbacks.getGameMode(url, info, sessionID);
                },
            },
            {
                url: "/client/server/list",
                action: async (url, info, sessionID): Promise<IGetBodyResponseData<IServerDetails[]>> => {
                    return this.gameCallbacks.getServer(url, info, sessionID);
                },
            },
            {
                url: "/client/match/group/current",
                action: async (url, info, sessionID): Promise<IGetBodyResponseData<ICurrentGroupResponse>> => {
                    return this.gameCallbacks.getCurrentGroup(url, info, sessionID);
                },
            },
            {
                url: "/client/game/version/validate",
                action: async (url, info, sessionID): Promise<INullResponseData> => {
                    return this.gameCallbacks.versionValidate(url, info, sessionID);
                },
            },
            {
                url: "/client/game/start",
                action: async (url, info, sessionID): Promise<IGetBodyResponseData<IGameStartResponse>> => {
                    return this.gameCallbacks.gameStart(url, info, sessionID);
                },
            },
            {
                url: "/client/game/logout",
                action: async (url, info, sessionID): Promise<IGetBodyResponseData<IGameLogoutResponseData>> => {
                    return await this.gameCallbacks.gameLogout(url, info, sessionID);
                },
            },
            {
                url: "/client/checkVersion",
                action: async (url, info, sessionID): Promise<IGetBodyResponseData<ICheckVersionResponse>> => {
                    return this.gameCallbacks.validateGameVersion(url, info, sessionID);
                },
            },
            {
                url: "/client/game/keepalive",
                action: async (url, info, sessionID): Promise<IGetBodyResponseData<IGameKeepAliveResponse>> => {
                    return this.gameCallbacks.gameKeepalive(url, info, sessionID);
                },
            },
            {
                url: "/singleplayer/settings/version",
                action: async (url, info, sessionID): Promise<string> => {
                    return this.gameCallbacks.getVersion(url, info, sessionID);
                },
            },
            {
                url: "/client/reports/lobby/send",
                action: async (url, info, sessionID): Promise<INullResponseData> => {
                    return this.gameCallbacks.reportNickname(url, info, sessionID);
                },
            },
            {
                url: "/client/report/send",
                action: async (url, info: ISendReportRequest, sessionID): Promise<INullResponseData> => {
                    return this.gameCallbacks.reportNickname(url, info, sessionID);
                },
            },
            {
                url: "/singleplayer/settings/getRaidTime",
                action: async (url, info, sessionID): Promise<IGetRaidTimeResponse> => {
                    return this.gameCallbacks.getRaidTime(url, info, sessionID);
                },
            },
            {
                url: "/client/survey",
                action: async (
                    url,
                    info,
                    sessionID
                ): Promise<INullResponseData | IGetBodyResponseData<ISurveyResponseData>> => {
                    return this.gameCallbacks.getSurvey(url, info, sessionID);
                },
            },
            {
                url: "/client/survey/view",
                action: async (url, info, sessionID): Promise<INullResponseData> => {
                    return this.gameCallbacks.getSurveyView(url, info, sessionID);
                },
            },
            {
                url: "/client/survey/opinion",
                action: async (url, info, sessionID): Promise<INullResponseData> => {
                    return this.gameCallbacks.sendSurveyOpinion(url, info, sessionID);
                },
            },
        ]);
    }
}
