import { ProfileCallbacks } from "@spt/callbacks/ProfileCallbacks";
import { RouteAction, StaticRouter } from "@spt/di/Router";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { IGetProfileStatusResponseData } from "@spt/models/eft/profile/GetProfileStatusResponseData";
import { ICreateProfileResponse } from "@spt/models/eft/profile/ICreateProfileResponse";
import { IGetOtherProfileResponse } from "@spt/models/eft/profile/IGetOtherProfileResponse";
import { ISearchFriendResponse } from "@spt/models/eft/profile/ISearchFriendResponse";
import { inject, injectable } from "tsyringe";

@injectable()
export class ProfileStaticRouter extends StaticRouter {
    constructor(@inject("ProfileCallbacks") protected profileCallbacks: ProfileCallbacks) {
        super([
            {
                url: "/client/game/profile/create",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<ICreateProfileResponse>> => {
                    return this.profileCallbacks.createProfile(url, info, sessionID);
                },
            },
            {
                url: "/client/game/profile/list",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<IPmcData[]>> => {
                    return this.profileCallbacks.getProfileData(url, info, sessionID);
                },
            },
            {
                url: "/client/game/profile/savage/regenerate",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<IPmcData[]>> => {
                    return this.profileCallbacks.regenerateScav(url, info, sessionID);
                },
            },
            {
                url: "/client/game/profile/voice/change",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<INullResponseData> => {
                    return this.profileCallbacks.changeVoice(url, info, sessionID);
                },
            },
            {
                url: "/client/game/profile/nickname/change",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<any>> => {
                    return this.profileCallbacks.changeNickname(url, info, sessionID);
                },
            },
            {
                url: "/client/game/profile/nickname/validate",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<any>> => {
                    return this.profileCallbacks.validateNickname(url, info, sessionID);
                },
            },
            {
                url: "/client/game/profile/nickname/reserved",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<string>> => {
                    return this.profileCallbacks.getReservedNickname(url, info, sessionID);
                },
            },
            {
                url: "/client/profile/status",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<IGetProfileStatusResponseData>> => {
                    return this.profileCallbacks.getProfileStatus(url, info, sessionID);
                },
            },
            {
                url: "/client/profile/view",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<IGetOtherProfileResponse>> => {
                    return this.profileCallbacks.getOtherProfile(url, info, sessionID);
                },
            },
            {
                url: "/client/profile/settings",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<boolean>> => {
                    return this.profileCallbacks.getProfileSettings(url, info, sessionID);
                },
            },
            {
                url: "/client/game/profile/search",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<ISearchFriendResponse[]>> => {
                    return this.profileCallbacks.searchFriend(url, info, sessionID);
                },
            },
            {
                url: "/launcher/profile/info",
                action: async (url: string, info: any, sessionID: string, output: string): Promise<string> => {
                    return this.profileCallbacks.getMiniProfile(url, info, sessionID);
                },
            },
            {
                url: "/launcher/profiles",
                action: async (url: string, info: any, sessionID: string, output: string): Promise<string> => {
                    return this.profileCallbacks.getAllMiniProfiles(url, info, sessionID);
                },
            },
        ]);
    }
}
