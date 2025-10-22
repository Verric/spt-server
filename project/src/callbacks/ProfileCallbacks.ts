import { ProfileController } from "@spt/controllers/ProfileController";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { IGetMiniProfileRequestData } from "@spt/models/eft/launcher/IGetMiniProfileRequestData";
import { IGetProfileStatusResponseData } from "@spt/models/eft/profile/GetProfileStatusResponseData";
import { ICreateProfileResponse } from "@spt/models/eft/profile/ICreateProfileResponse";
import { IGetOtherProfileRequest } from "@spt/models/eft/profile/IGetOtherProfileRequest";
import { IGetOtherProfileResponse } from "@spt/models/eft/profile/IGetOtherProfileResponse";
import { IGetProfileSettingsRequest } from "@spt/models/eft/profile/IGetProfileSettingsRequest";
import { IProfileChangeNicknameRequestData } from "@spt/models/eft/profile/IProfileChangeNicknameRequestData";
import { IProfileChangeVoiceRequestData } from "@spt/models/eft/profile/IProfileChangeVoiceRequestData";
import { IProfileCreateRequestData } from "@spt/models/eft/profile/IProfileCreateRequestData";
import { ISearchFriendRequestData } from "@spt/models/eft/profile/ISearchFriendRequestData";
import { ISearchFriendResponse } from "@spt/models/eft/profile/ISearchFriendResponse";
import { IValidateNicknameRequestData } from "@spt/models/eft/profile/IValidateNicknameRequestData";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { inject, injectable } from "tsyringe";

/** Handle profile related client events */
@injectable()
export class ProfileCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected timeUtil: TimeUtil;
    protected profileController: ProfileController;
    protected profileHelper: ProfileHelper;

    constructor(
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("TimeUtil") timeUtil: TimeUtil,
        @inject("ProfileController") profileController: ProfileController,
        @inject("ProfileHelper") profileHelper: ProfileHelper
    ) {
        this.httpResponse = httpResponse;
        this.timeUtil = timeUtil;
        this.profileController = profileController;
        this.profileHelper = profileHelper;
    }

    /**
     * Handle client/game/profile/create
     */
    public async createProfile(
        _url: string,
        info: IProfileCreateRequestData,
        sessionID: string
    ): Promise<IGetBodyResponseData<ICreateProfileResponse>> {
        return this.httpResponse.getBody({ uid: await this.profileController.createProfile(info, sessionID) });
    }

    /**
     * Handle client/game/profile/list
     * Get the complete player profile (scav + pmc character)
     */
    public getProfileData(_url: string, _info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IPmcData[]> {
        return this.httpResponse.getBody(this.profileController.getCompleteProfile(sessionID));
    }

    /**
     * Handle client/game/profile/savage/regenerate
     * Handle the creation of a scav profile for player
     * Occurs post-raid and when profile first created immediately after character details are confirmed by player
     * @param url
     * @param info empty
     * @param sessionID Session id
     * @returns Profile object
     */
    public regenerateScav(_url: string, _info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IPmcData[]> {
        return this.httpResponse.getBody([this.profileController.generatePlayerScav(sessionID)]);
    }

    /**
     * Handle client/game/profile/voice/change event
     */
    public changeVoice(_url: string, info: IProfileChangeVoiceRequestData, sessionID: string): INullResponseData {
        this.profileController.changeVoice(info, sessionID);
        return this.httpResponse.nullResponse();
    }

    /**
     * Handle client/game/profile/nickname/change event
     * Client allows player to adjust their profile name
     */
    public changeNickname(
        _url: string,
        info: IProfileChangeNicknameRequestData,
        sessionID: string
    ): IGetBodyResponseData<any> {
        const output = this.profileController.changeNickname(info, sessionID);

        if (output === "taken") {
            return this.httpResponse.getBody(undefined, 255, "The nickname is already in use");
        }

        if (output === "tooshort") {
            return this.httpResponse.getBody(undefined, 1, "The nickname is too short");
        }

        return this.httpResponse.getBody({ status: 0, nicknamechangedate: this.timeUtil.getTimestamp() });
    }

    /**
     * Handle client/game/profile/nickname/validate
     */
    public validateNickname(
        _url: string,
        info: IValidateNicknameRequestData,
        sessionID: string
    ): IGetBodyResponseData<any> {
        const output = this.profileController.validateNickname(info, sessionID);

        if (output === "taken") {
            return this.httpResponse.getBody(undefined, 255, "225 - ");
        }

        if (output === "tooshort") {
            return this.httpResponse.getBody(undefined, 256, "256 - ");
        }

        return this.httpResponse.getBody({ status: "ok" });
    }

    /**
     * Handle client/game/profile/nickname/reserved
     */
    public getReservedNickname(
        _url: string,
        _info: IEmptyRequestData,
        sessionID: string
    ): IGetBodyResponseData<string> {
        const fullProfile = this.profileHelper.getFullProfile(sessionID);
        if (fullProfile?.info?.username) {
            return this.httpResponse.getBody(fullProfile.info.username);
        }

        return this.httpResponse.getBody("SPTarkov");
    }

    /**
     * Handle client/profile/status
     * Called when creating a character when choosing a character face/voice
     */
    public getProfileStatus(
        _url: string,
        _info: IEmptyRequestData,
        sessionID: string
    ): IGetBodyResponseData<IGetProfileStatusResponseData> {
        return this.httpResponse.getBody(this.profileController.getProfileStatus(sessionID));
    }

    /**
     * Handle client/profile/view
     * Called when viewing another players profile
     */
    public getOtherProfile(
        _url: string,
        request: IGetOtherProfileRequest,
        sessionID: string
    ): IGetBodyResponseData<IGetOtherProfileResponse> {
        return this.httpResponse.getBody(this.profileController.getOtherProfile(sessionID, request));
    }

    /**
     * Handle client/profile/settings
     */
    public getProfileSettings(
        _url: string,
        info: IGetProfileSettingsRequest,
        sessionId: string
    ): IGetBodyResponseData<boolean> {
        return this.httpResponse.getBody(this.profileController.setChosenProfileIcon(sessionId, info));
    }

    /**
     * Handle client/game/profile/search
     */
    public searchFriend(
        _url: string,
        info: ISearchFriendRequestData,
        sessionID: string
    ): IGetBodyResponseData<ISearchFriendResponse[]> {
        return this.httpResponse.getBody(this.profileController.getFriends(info, sessionID));
    }

    /**
     * Handle launcher/profile/info
     */
    public getMiniProfile(_url: string, _info: IGetMiniProfileRequestData, sessionID: string): string {
        return this.httpResponse.noBody(this.profileController.getMiniProfile(sessionID));
    }

    /**
     * Handle /launcher/profiles
     */
    public getAllMiniProfiles(_url: string, _info: IEmptyRequestData, _sessionID: string): string {
        return this.httpResponse.noBody(this.profileController.getMiniProfiles());
    }
}
