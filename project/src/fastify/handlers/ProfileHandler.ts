import { ProfileController } from "@spt/controllers/ProfileController";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
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
import { FastifyInstance, FastifyRequest } from "fastify";
import { inject } from "tsyringe";

export class ProfileHandler {
    private httpResponse: HttpResponseUtil;
    private timeUtil: TimeUtil;
    private profileController: ProfileController;
    private profileHelper: ProfileHelper;

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

    async createProfile(req: FastifyRequest<{ Body: IProfileCreateRequestData }>) {
        return this.httpResponse.getBody<ICreateProfileResponse>({
            uid: await this.profileController.createProfile(req.body, req.sessionId),
        });
    }

    getProfileData(req: FastifyRequest) {
        return this.httpResponse.getBody<IPmcData[]>(this.profileController.getCompleteProfile(req.sessionId));
    }

    regenerateScav(req: FastifyRequest) {
        return this.httpResponse.getBody<IPmcData[]>([this.profileController.generatePlayerScav(req.sessionId)]);
    }

    changeVoice(req: FastifyRequest<{ Body: IProfileChangeVoiceRequestData }>) {
        this.profileController.changeVoice(req.body, req.sessionId);
        return this.httpResponse.nullResponse();
    }

    changeNickname(req: FastifyRequest<{ Body: IProfileChangeNicknameRequestData }>) {
        const output = this.profileController.changeNickname(req.body, req.sessionId);
        if (output === "taken") return this.httpResponse.getBody(undefined, 255, "The nickname is already in use");
        if (output === "tooshort") return this.httpResponse.getBody(undefined, 1, "The nickname is too short");
        return this.httpResponse.getBody({ status: 0, nicknamechangedate: this.timeUtil.getTimestamp() });
    }

    validateNickname(req: FastifyRequest<{ Body: IValidateNicknameRequestData }>) {
        const output = this.profileController.validateNickname(req.body, req.sessionId);
        if (output === "taken") return this.httpResponse.getBody(undefined, 255, "225 - ");
        if (output === "tooshort") return this.httpResponse.getBody(undefined, 256, "256 - ");
        return this.httpResponse.getBody({ status: "ok" });
    }

    getReservedNickname(req: FastifyRequest) {
        const fullProfile = this.profileHelper.getFullProfile(req.sessionId);
        if (fullProfile?.info?.username) return this.httpResponse.getBody<string>(fullProfile.info.username);
        return this.httpResponse.getBody<string>("SPTarkov");
    }

    getProfileStatus(req: FastifyRequest) {
        return this.httpResponse.getBody<IGetProfileStatusResponseData>(
            this.profileController.getProfileStatus(req.sessionId)
        );
    }

    getOtherProfile(req: FastifyRequest<{ Body: IGetOtherProfileRequest }>) {
        return this.httpResponse.getBody<IGetOtherProfileResponse>(
            this.profileController.getOtherProfile(req.sessionId, req.body)
        );
    }

    getProfileSettings(req: FastifyRequest<{ Body: IGetProfileSettingsRequest }>) {
        return this.httpResponse.getBody<boolean>(this.profileController.setChosenProfileIcon(req.sessionId, req.body));
    }

    searchFriend(req: FastifyRequest<{ Body: ISearchFriendRequestData }>) {
        return this.httpResponse.getBody<ISearchFriendResponse[]>(
            this.profileController.getFriends(req.body, req.sessionId)
        );
    }

    getMiniProfile(req: FastifyRequest) {
        return this.httpResponse.noBody(this.profileController.getMiniProfile(req.sessionId));
    }

    getAllMiniProfiles() {
        return this.httpResponse.noBody(this.profileController.getMiniProfiles());
    }

    registerRoutes(fastify: FastifyInstance) {
        fastify.get("/client/game/profile/create", this.createProfile.bind(this));
        fastify.get("/client/game/profile/list", this.getProfileData.bind(this));
        fastify.get("/client/game/profile/savage/regenerate", this.regenerateScav.bind(this));
        fastify.get("/client/game/profile/voice/change", this.changeVoice.bind(this));
        fastify.get("/client/game/profile/nickname/change", this.changeNickname.bind(this));
        fastify.get("/client/game/profile/nickname/validate", this.validateNickname.bind(this));
        fastify.get("/client/game/profile/nickname/reserved", this.getReservedNickname.bind(this));
        fastify.get("/client/profile/status", this.getProfileStatus.bind(this));
        fastify.get("/client/profile/view", this.getOtherProfile.bind(this));
        fastify.get("/client/profile/settings", this.getProfileSettings.bind(this));
        fastify.get("/client/game/profile/search", this.searchFriend.bind(this));
        fastify.get("/launcher/profile/info", this.getMiniProfile.bind(this));
        fastify.get("/launcher/profiles", this.getAllMiniProfiles.bind(this));
    }
}
