import { DialogueController } from "@spt/controllers/DialogueController";
import { IChatServer } from "@spt/models/eft/dialog/IChatServer";
import { IDeleteFriendRequest } from "@spt/models/eft/dialog/IDeleteFriendRequest";
import { IFriendRequestData } from "@spt/models/eft/dialog/IFriendRequestData";
import { IGetAllAttachmentsRequestData } from "@spt/models/eft/dialog/IGetAllAttachmentsRequestData";
import { IGetMailDialogInfoRequestData } from "@spt/models/eft/dialog/IGetMailDialogInfoRequestData";
import { IGetMailDialogListRequestData } from "@spt/models/eft/dialog/IGetMailDialogListRequestData";
import { IGetMailDialogViewRequestData } from "@spt/models/eft/dialog/IGetMailDialogViewRequestData";
import { IPinDialogRequestData } from "@spt/models/eft/dialog/IPinDialogRequestData";
import { IRemoveDialogRequestData } from "@spt/models/eft/dialog/IRemoveDialogRequestData";
import { ISendMessageRequest } from "@spt/models/eft/dialog/ISendMessageRequest";
import { ISetDialogReadRequestData } from "@spt/models/eft/dialog/ISetDialogReadRequestData";
import { HashUtil } from "@spt/utils/HashUtil";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { FastifyInstance, FastifyRequest } from "fastify";
import { inject } from "tsyringe";

export class DialogueHandler {
    private hashUtil: HashUtil;
    private timeUtil: TimeUtil;
    private httpResponse: HttpResponseUtil;
    private dialogueController: DialogueController;

    constructor(
        @inject("HashUtil") hashUtil: HashUtil,
        @inject("TimeUtil") timeUtil: TimeUtil,
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("DialogueController") dialogueController: DialogueController
    ) {
        this.hashUtil = hashUtil;
        this.timeUtil = timeUtil;
        this.httpResponse = httpResponse;
        this.dialogueController = dialogueController;
    }

    getChatServerList() {
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

    getMailDialogList(req: FastifyRequest<{ Body: IGetMailDialogListRequestData }>) {
        return this.httpResponse.getBody(
            this.dialogueController.generateDialogueList(req.sessionId),
            0,
            undefined,
            false
        );
    }

    getMailDialogView(req: FastifyRequest<{ Body: IGetMailDialogViewRequestData }>) {
        return this.httpResponse.getBody(
            this.dialogueController.generateDialogueView(req.body, req.sessionId),
            0,
            undefined,
            false
        );
    }

    getMailDialogInfo(req: FastifyRequest<{ Body: IGetMailDialogInfoRequestData }>) {
        return this.httpResponse.getBody(this.dialogueController.getDialogueInfo(req.body.dialogId, req.sessionId));
    }

    removeDialog(req: FastifyRequest<{ Body: IRemoveDialogRequestData }>) {
        this.dialogueController.removeDialogue(req.body.dialogId, req.sessionId);
        return this.httpResponse.emptyArrayResponse();
    }

    pinDialog(req: FastifyRequest<{ Body: IPinDialogRequestData }>) {
        this.dialogueController.setDialoguePin(req.body.dialogId, true, req.sessionId);
        return this.httpResponse.emptyArrayResponse();
    }

    unpinDialog(req: FastifyRequest<{ Body: IPinDialogRequestData }>) {
        this.dialogueController.setDialoguePin(req.body.dialogId, false, req.sessionId);
        return this.httpResponse.emptyArrayResponse();
    }

    setRead(req: FastifyRequest<{ Body: ISetDialogReadRequestData }>) {
        this.dialogueController.setRead(req.body.dialogs, req.sessionId);
        return this.httpResponse.emptyArrayResponse();
    }

    getAllAttachments(req: FastifyRequest<{ Body: IGetAllAttachmentsRequestData }>) {
        return this.httpResponse.getBody(this.dialogueController.getAllAttachments(req.body.dialogId, req.sessionId));
    }

    sendMessage(req: FastifyRequest<{ Body: ISendMessageRequest }>) {
        return this.httpResponse.getBody(this.dialogueController.sendMessage(req.sessionId, req.body));
    }

    clearMail() {
        return this.httpResponse.emptyArrayResponse();
    }

    createGroupMail() {
        return this.httpResponse.emptyArrayResponse();
    }

    changeMailGroupOwner() {
        throw new Error("Method not implemented.");
    }

    addUserToMail() {
        throw new Error("Method not implemented.");
    }

    removeUserFromMail() {
        throw new Error("Method not implemented.");
    }

    getFriendList(req: FastifyRequest) {
        return this.httpResponse.getBody(this.dialogueController.getFriendList(req.sessionId));
    }

    listOutbox() {
        return this.httpResponse.getBody([]);
    }

    listInbox() {
        return this.httpResponse.getBody([]);
    }

    sendFriendRequest(req: FastifyRequest<{ Body: IFriendRequestData }>) {
        return this.httpResponse.getBody(this.dialogueController.sendFriendRequest(req.sessionId, req.body));
    }

    acceptAllFriendRequests() {
        return this.httpResponse.nullResponse();
    }

    acceptFriendRequest() {
        return this.httpResponse.getBody(true);
    }

    declineFriendRequest() {
        return this.httpResponse.getBody(true);
    }

    cancelFriendRequest() {
        return this.httpResponse.getBody(true);
    }

    deleteFriend(req: FastifyRequest<{ Body: IDeleteFriendRequest }>) {
        this.dialogueController.deleteFriend(req.sessionId, req.body);
        return this.httpResponse.nullResponse();
    }

    ignoreFriend() {
        return this.httpResponse.nullResponse();
    }

    unIgnoreFriend() {
        return this.httpResponse.nullResponse();
    }

    registerRoutes(fastify: FastifyInstance) {
        fastify.get("/client/chatServer/list", this.getChatServerList.bind(this));
        fastify.get("/client/mail/dialog/list", this.getMailDialogList.bind(this));
        fastify.get("/client/mail/dialog/view", this.getMailDialogView.bind(this));
        fastify.get("/client/mail/dialog/info", this.getMailDialogInfo.bind(this));
        fastify.get("/client/mail/dialog/remove", this.removeDialog.bind(this));
        fastify.get("/client/mail/dialog/pin", this.pinDialog.bind(this));
        fastify.get("/client/mail/dialog/unpin", this.unpinDialog.bind(this));
        fastify.get("/client/mail/dialog/read", this.setRead.bind(this));
        fastify.get("/client/mail/dialog/getAllAttachments", this.getAllAttachments.bind(this));
        fastify.get("/client/mail/msg/send", this.sendMessage.bind(this));
        fastify.get("/client/mail/dialog/clear", this.clearMail.bind(this));
        fastify.get("/client/mail/dialog/group/create", this.createGroupMail.bind(this));
        fastify.get("/client/mail/dialog/group/owner/change", this.changeMailGroupOwner.bind(this));
        fastify.get("/client/mail/dialog/group/users/add", this.addUserToMail.bind(this));
        fastify.get("/client/mail/dialog/group/users/remove", this.removeUserFromMail.bind(this));
        fastify.get("/client/friend/list", this.getFriendList.bind(this));
        fastify.get("/client/friend/request/list/outbox", this.listOutbox.bind(this));
        fastify.get("/client/friend/request/list/inbox", this.listInbox.bind(this));
        fastify.get("/client/friend/request/send", this.sendFriendRequest.bind(this));
        fastify.get("/client/friend/request/accept-all", this.acceptAllFriendRequests.bind(this));
        fastify.get("/client/friend/request/accept", this.acceptFriendRequest.bind(this));
        fastify.get("/client/friend/request/decline", this.declineFriendRequest.bind(this));
        fastify.get("/client/friend/request/cancel", this.cancelFriendRequest.bind(this));
        fastify.get("/client/friend/delete", this.deleteFriend.bind(this));
        fastify.get("/client/friend/ignore/set", this.ignoreFriend.bind(this));
        fastify.get("/client/friend/ignore/remove", this.unIgnoreFriend.bind(this));
    }
}
