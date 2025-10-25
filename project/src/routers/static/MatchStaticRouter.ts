import { MatchCallbacks } from "@spt/callbacks/MatchCallbacks";
import { RouteAction, StaticRouter } from "@spt/di/Router";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { IMetrics } from "@spt/models/eft/common/tables/IMatch";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { IGroupCharacter } from "@spt/models/eft/match/IGroupCharacter";
import { IMatchGroupCurrentResponse } from "@spt/models/eft/match/IMatchGroupCurrentResponse";
import { IMatchGroupStatusResponse } from "@spt/models/eft/match/IMatchGroupStatusResponse";
import { IProfileStatusResponse } from "@spt/models/eft/match/IProfileStatusResponse";
import { IStartLocalRaidResponseData } from "@spt/models/eft/match/IStartLocalRaidResponseData";
import { inject, injectable } from "tsyringe";

@injectable()
export class MatchStaticRouter extends StaticRouter {
    constructor(@inject("MatchCallbacks") protected matchCallbacks: MatchCallbacks) {
        super([
            {
                url: "/client/match/available",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<boolean>> => {
                    return this.matchCallbacks.serverAvailable(url, info, sessionID);
                },
            },
            {
                url: "/client/match/updatePing",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<INullResponseData> => {
                    return this.matchCallbacks.updatePing(url, info, sessionID);
                },
            },
            {
                url: "/client/match/join",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<IProfileStatusResponse>> => {
                    return this.matchCallbacks.joinMatch(url, info, sessionID);
                },
            },
            {
                url: "/client/match/exit",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<INullResponseData> => {
                    return this.matchCallbacks.exitMatch(url, info, sessionID);
                },
            },
            {
                url: "/client/match/group/delete",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<boolean>> => {
                    return this.matchCallbacks.deleteGroup(url, info, sessionID);
                },
            },
            {
                url: "/client/match/group/leave",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<boolean>> => {
                    return this.matchCallbacks.leaveGroup(url, info, sessionID);
                },
            },
            {
                url: "/client/match/group/status",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<IMatchGroupStatusResponse>> => {
                    return this.matchCallbacks.getGroupStatus(url, info, sessionID);
                },
            },
            {
                url: "/client/match/group/start_game",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<IProfileStatusResponse>> => {
                    return this.matchCallbacks.joinMatch(url, info, sessionID);
                },
            },
            {
                url: "/client/match/group/exit_from_menu",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<INullResponseData> => {
                    return this.matchCallbacks.exitFromMenu(url, info, sessionID);
                },
            },
            {
                url: "/client/match/group/current",
                action: async (
                    url: string,
                    info: IEmptyRequestData,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<IMatchGroupCurrentResponse>> => {
                    return this.matchCallbacks.groupCurrent(url, info, sessionID);
                },
            },
            {
                url: "/client/match/group/looking/start",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<INullResponseData> => {
                    return this.matchCallbacks.startGroupSearch(url, info, sessionID);
                },
            },
            {
                url: "/client/match/group/looking/stop",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<INullResponseData> => {
                    return this.matchCallbacks.stopGroupSearch(url, info, sessionID);
                },
            },
            {
                url: "/client/match/group/invite/send",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<string>> => {
                    return this.matchCallbacks.sendGroupInvite(url, info, sessionID);
                },
            },
            {
                url: "/client/match/group/invite/accept",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<IGroupCharacter[]>> => {
                    return this.matchCallbacks.acceptGroupInvite(url, info, sessionID);
                },
            },
            {
                url: "/client/match/group/invite/decline",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<any>> => {
                    return this.matchCallbacks.declineGroupInvite(url, info, sessionID);
                },
            },
            {
                url: "/client/match/group/invite/cancel",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<boolean>> => {
                    return this.matchCallbacks.cancelGroupInvite(url, info, sessionID);
                },
            },
            {
                url: "/client/match/group/invite/cancel-all",
                action: async (
                    url: string,
                    info: IEmptyRequestData,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<boolean>> => {
                    return this.matchCallbacks.cancelAllGroupInvite(url, info, sessionID);
                },
            },
            {
                url: "/client/match/group/transfer",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<boolean>> => {
                    return this.matchCallbacks.transferGroup(url, info, sessionID);
                },
            },
            {
                url: "/client/match/group/raid/ready",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<boolean>> => {
                    return this.matchCallbacks.raidReady(url, info, sessionID);
                },
            },
            {
                url: "/client/match/group/raid/not-ready",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<boolean>> => {
                    return this.matchCallbacks.notRaidReady(url, info, sessionID);
                },
            },
            {
                url: "/client/putMetrics",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<INullResponseData> => {
                    return this.matchCallbacks.putMetrics(url, info, sessionID);
                },
            },
            {
                url: "/client/analytics/event-disconnect",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<INullResponseData> => {
                    return this.matchCallbacks.eventDisconnect(url, info, sessionID);
                },
            },
            {
                url: "/client/getMetricsConfig",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<IMetrics>> => {
                    return this.matchCallbacks.getMetrics(url, info, sessionID);
                },
            },
            {
                url: "/client/raid/configuration",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<INullResponseData> => {
                    return this.matchCallbacks.getRaidConfiguration(url, info, sessionID);
                },
            },
            {
                url: "/client/raid/configuration-by-profile",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<INullResponseData> => {
                    return this.matchCallbacks.getConfigurationByProfile(url, info, sessionID);
                },
            },
            {
                url: "/client/match/group/player/remove",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<boolean>> => {
                    return this.matchCallbacks.removePlayerFromGroup(url, info, sessionID);
                },
            },
            {
                url: "/client/match/local/start",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<IStartLocalRaidResponseData>> => {
                    return this.matchCallbacks.startLocalRaid(url, info, sessionID);
                },
            },
            {
                url: "/client/match/local/end",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<INullResponseData> => {
                    return this.matchCallbacks.endLocalRaid(url, info, sessionID);
                },
            },
        ]);
    }
}
