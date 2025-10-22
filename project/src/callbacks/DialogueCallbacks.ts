import { DialogueController } from "@spt/controllers/DialogueController";
import { OnUpdate } from "@spt/di/OnUpdate";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { IUIDRequestData } from "@spt/models/eft/common/request/IUIDRequestData";
import {
    IAcceptFriendRequestData,
    ICancelFriendRequestData,
    IDeclineFriendRequestData,
} from "@spt/models/eft/dialog/IAcceptFriendRequestData";
import { IAddUserGroupMailRequest } from "@spt/models/eft/dialog/IAddUserGroupMailRequest";
import { IChangeGroupMailOwnerRequest } from "@spt/models/eft/dialog/IChangeGroupMailOwnerRequest";
import { IChatServer } from "@spt/models/eft/dialog/IChatServer";
import { IClearMailMessageRequest } from "@spt/models/eft/dialog/IClearMailMessageRequest";
import { ICreateGroupMailRequest } from "@spt/models/eft/dialog/ICreateGroupMailRequest";
import { IDeleteFriendRequest } from "@spt/models/eft/dialog/IDeleteFriendRequest";
import { IFriendRequestData } from "@spt/models/eft/dialog/IFriendRequestData";
import { IFriendRequestSendResponse } from "@spt/models/eft/dialog/IFriendRequestSendResponse";
import { IGetAllAttachmentsRequestData } from "@spt/models/eft/dialog/IGetAllAttachmentsRequestData";
import { IGetAllAttachmentsResponse } from "@spt/models/eft/dialog/IGetAllAttachmentsResponse";
import { IGetChatServerListRequestData } from "@spt/models/eft/dialog/IGetChatServerListRequestData";
import { IGetFriendListDataResponse } from "@spt/models/eft/dialog/IGetFriendListDataResponse";
import { IGetMailDialogInfoRequestData } from "@spt/models/eft/dialog/IGetMailDialogInfoRequestData";
import { IGetMailDialogListRequestData } from "@spt/models/eft/dialog/IGetMailDialogListRequestData";
import { IGetMailDialogViewRequestData } from "@spt/models/eft/dialog/IGetMailDialogViewRequestData";
import { IGetMailDialogViewResponseData } from "@spt/models/eft/dialog/IGetMailDialogViewResponseData";
import { IPinDialogRequestData } from "@spt/models/eft/dialog/IPinDialogRequestData";
import { IRemoveDialogRequestData } from "@spt/models/eft/dialog/IRemoveDialogRequestData";
import { IRemoveUserGroupMailRequest } from "@spt/models/eft/dialog/IRemoveUserGroupMailRequest";
import { ISendMessageRequest } from "@spt/models/eft/dialog/ISendMessageRequest";
import { ISetDialogReadRequestData } from "@spt/models/eft/dialog/ISetDialogReadRequestData";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { IDialogueInfo } from "@spt/models/eft/profile/ISptProfile";
import { HashUtil } from "@spt/utils/HashUtil";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { inject, injectable } from "tsyringe";

@injectable()
export class DialogueCallbacks implements OnUpdate {
    protected hashUtil: HashUtil;
    protected timeUtil: TimeUtil;
    protected httpResponse: HttpResponseUtil;
    protected dialogueController: DialogueController;

    constructor(
        @inject("HashUtil") hashUtil: HashUtil,
        @inject("TimeUtil") timeUtil: TimeUtil,
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("DialogueController") dialogueController: DialogueController,
    ) {
        this.hashUtil = hashUtil;
        this.timeUtil = timeUtil;
        this.httpResponse = httpResponse;
        this.dialogueController = dialogueController;
    }

    /**
     * Handle client/friend/list
     * @returns IGetFriendListDataResponse
     */
    public getFriendList(
        _url: string,
        _info: IEmptyRequestData,
        sessionID: string,
    ): IGetBodyResponseData<IGetFriendListDataResponse> {
        return this.httpResponse.getBody(this.dialogueController.getFriendList(sessionID));
    }

    /**
     * Handle client/chatServer/list
     * @returns IChatServer[]
     */
    public getChatServerList(
        _url: string,
        _info: IGetChatServerListRequestData,
        _sessionID: string,
    ): IGetBodyResponseData<IChatServer[]> {
        const chatServer: IChatServer = {
            _id: this.hashUtil.generate(),
            RegistrationId: 20,
            DateTime: this.timeUtil.getTimestamp(),
            IsDeveloper: true,
            Regions: ["EUR"],
            VersionId: "bgkidft87ddd",
            Ip: "",
            Port: 0,
            Chats: [{ _id: "0", Members: 0 }],
        };

        return this.httpResponse.getBody([chatServer]);
    }

    /** Handle client/mail/dialog/list */
    public getMailDialogList(
        _url: string,
        _info: IGetMailDialogListRequestData,
        sessionID: string,
    ): IGetBodyResponseData<IDialogueInfo[]> {
        return this.httpResponse.getBody(this.dialogueController.generateDialogueList(sessionID), 0, undefined, false);
    }

    /** Handle client/mail/dialog/view */
    public getMailDialogView(
        _url: string,
        info: IGetMailDialogViewRequestData,
        sessionID: string,
    ): IGetBodyResponseData<IGetMailDialogViewResponseData> {
        return this.httpResponse.getBody(
            this.dialogueController.generateDialogueView(info, sessionID),
            0,
            undefined,
            false,
        );
    }

    /** Handle client/mail/dialog/info */
    public getMailDialogInfo(
        _url: string,
        info: IGetMailDialogInfoRequestData,
        sessionID: string,
    ): IGetBodyResponseData<IDialogueInfo> {
        return this.httpResponse.getBody(this.dialogueController.getDialogueInfo(info.dialogId, sessionID));
    }

    /** Handle client/mail/dialog/remove */
    public removeDialog(_url: string, info: IRemoveDialogRequestData, sessionID: string): IGetBodyResponseData<[]> {
        this.dialogueController.removeDialogue(info.dialogId, sessionID);
        return this.httpResponse.emptyArrayResponse();
    }

    /** Handle client/mail/dialog/pin */
    public pinDialog(_url: string, info: IPinDialogRequestData, sessionID: string): IGetBodyResponseData<[]> {
        this.dialogueController.setDialoguePin(info.dialogId, true, sessionID);
        return this.httpResponse.emptyArrayResponse();
    }

    /** Handle client/mail/dialog/unpin */
    public unpinDialog(_url: string, info: IPinDialogRequestData, sessionID: string): IGetBodyResponseData<[]> {
        this.dialogueController.setDialoguePin(info.dialogId, false, sessionID);
        return this.httpResponse.emptyArrayResponse();
    }

    /** Handle client/mail/dialog/read */
    public setRead(_url: string, info: ISetDialogReadRequestData, sessionID: string): IGetBodyResponseData<[]> {
        this.dialogueController.setRead(info.dialogs, sessionID);
        return this.httpResponse.emptyArrayResponse();
    }

    /**
     * Handle client/mail/dialog/getAllAttachments
     * @returns IGetAllAttachmentsResponse
     */
    public getAllAttachments(
        _url: string,
        info: IGetAllAttachmentsRequestData,
        sessionID: string,
    ): IGetBodyResponseData<IGetAllAttachmentsResponse | undefined> {
        return this.httpResponse.getBody(this.dialogueController.getAllAttachments(info.dialogId, sessionID));
    }

    /** Handle client/mail/msg/send */
    public sendMessage(_url: string, request: ISendMessageRequest, sessionID: string): IGetBodyResponseData<string> {
        return this.httpResponse.getBody(this.dialogueController.sendMessage(sessionID, request));
    }

    /** Handle client/friend/request/list/outbox */
    public listOutbox(_url: string, _info: IEmptyRequestData, _sessionID: string): IGetBodyResponseData<[]> {
        return this.httpResponse.getBody([]);
    }

    /**
     * Handle client/friend/request/list/inbox
     */
    public listInbox(_url: string, _info: IEmptyRequestData, _sessionID: string): IGetBodyResponseData<[]> {
        return this.httpResponse.getBody([]);
    }

    /**
     * Handle client/friend/request/send
     */
    public sendFriendRequest(
        _url: string,
        request: IFriendRequestData,
        sessionID: string,
    ): IGetBodyResponseData<IFriendRequestSendResponse> {
        return this.httpResponse.getBody(this.dialogueController.sendFriendRequest(sessionID, request));
    }

    /**
     * Handle client/friend/request/accept-all
     */
    public acceptAllFriendRequests(_url: string, _request: IEmptyRequestData, _sessionID: string): INullResponseData {
        return this.httpResponse.nullResponse();
    }

    /**
     * Handle client/friend/request/accept
     */
    public acceptFriendRequest(
        _url: string,
        _request: IAcceptFriendRequestData,
        _sessionID: string,
    ): IGetBodyResponseData<boolean> {
        return this.httpResponse.getBody(true);
    }

    /**
     * Handle client/friend/request/decline
     */
    public declineFriendRequest(
        _url: string,
        _request: IDeclineFriendRequestData,
        _sessionID: string,
    ): IGetBodyResponseData<boolean> {
        return this.httpResponse.getBody(true);
    }

    /**
     * Handle client/friend/request/cancel
     */
    public cancelFriendRequest(
        _url: string,
        _request: ICancelFriendRequestData,
        _sessionID: string,
    ): IGetBodyResponseData<boolean> {
        return this.httpResponse.getBody(true);
    }

    /** Handle client/friend/delete */
    public deleteFriend(_url: string, request: IDeleteFriendRequest, sessionID: string): INullResponseData {
        this.dialogueController.deleteFriend(sessionID, request);
        return this.httpResponse.nullResponse();
    }

    /** Handle client/friend/ignore/set */
    public ignoreFriend(_url: string, _request: IUIDRequestData, _sessionID: string): INullResponseData {
        return this.httpResponse.nullResponse();
    }

    /** Handle client/friend/ignore/remove */
    public unIgnoreFriend(_url: string, _request: IUIDRequestData, _sessionID: string): INullResponseData {
        return this.httpResponse.nullResponse();
    }

    public clearMail(_url: string, _request: IClearMailMessageRequest, _sessionID: string): IGetBodyResponseData<[]> {
        return this.httpResponse.emptyArrayResponse();
    }

    public createGroupMail(_url: string, _info: ICreateGroupMailRequest, _sessionID: string): IGetBodyResponseData<[]> {
        return this.httpResponse.emptyArrayResponse();
    }

    public changeMailGroupOwner(
        _url: string,
        _info: IChangeGroupMailOwnerRequest,
        _sessionID: string,
    ): IGetBodyResponseData<never> {
        throw new Error("Method not implemented.");
    }

    public addUserToMail(
        _url: string,
        _info: IAddUserGroupMailRequest,
        _sessionID: string,
    ): IGetBodyResponseData<never> {
        throw new Error("Method not implemented.");
    }

    public removeUserFromMail(
        _url: string,
        _info: IRemoveUserGroupMailRequest,
        _sessionID: string,
    ): IGetBodyResponseData<never> {
        throw new Error("Method not implemented.");
    }

    public async onUpdate(_timeSinceLastRun: number): Promise<boolean> {
        this.dialogueController.update();
        return true;
    }

    public getRoute(): string {
        return "spt-dialogue";
    }
}
