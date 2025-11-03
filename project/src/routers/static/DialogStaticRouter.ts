import { DialogueCallbacks } from "@spt/callbacks/DialogueCallbacks";
import { StaticRouter } from "@spt/di/Router";
import { IAddUserGroupMailRequest } from "@spt/models/eft/dialog/IAddUserGroupMailRequest";
import { IChangeGroupMailOwnerRequest } from "@spt/models/eft/dialog/IChangeGroupMailOwnerRequest";
import { IChatServer } from "@spt/models/eft/dialog/IChatServer";
import { ICreateGroupMailRequest } from "@spt/models/eft/dialog/ICreateGroupMailRequest";
import { IFriendRequestSendResponse } from "@spt/models/eft/dialog/IFriendRequestSendResponse";
import { IGetAllAttachmentsResponse } from "@spt/models/eft/dialog/IGetAllAttachmentsResponse";
import { IGetFriendListDataResponse } from "@spt/models/eft/dialog/IGetFriendListDataResponse";
import { IGetMailDialogViewResponseData } from "@spt/models/eft/dialog/IGetMailDialogViewResponseData";
import { IRemoveUserGroupMailRequest } from "@spt/models/eft/dialog/IRemoveUserGroupMailRequest";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { IDialogueInfo } from "@spt/models/eft/profile/ISptProfile";
import { inject, injectable } from "tsyringe";

@injectable()
export class DialogStaticRouter extends StaticRouter {
    constructor(@inject("DialogueCallbacks") protected dialogueCallbacks: DialogueCallbacks) {
        super([
            {
                url: "/client/chatServer/list",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<IChatServer[]>> => {
                    return this.dialogueCallbacks.getChatServerList(url, info, sessionID);
                },
            },
            {
                url: "/client/mail/dialog/list",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<IDialogueInfo[]>> => {
                    return this.dialogueCallbacks.getMailDialogList(url, info, sessionID);
                },
            },
            {
                url: "/client/mail/dialog/view",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<IGetMailDialogViewResponseData>> => {
                    return this.dialogueCallbacks.getMailDialogView(url, info, sessionID);
                },
            },
            {
                url: "/client/mail/dialog/info",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<IDialogueInfo>> => {
                    return this.dialogueCallbacks.getMailDialogInfo(url, info, sessionID);
                },
            },
            {
                url: "/client/mail/dialog/remove",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<any[]>> => {
                    return this.dialogueCallbacks.removeDialog(url, info, sessionID);
                },
            },
            {
                url: "/client/mail/dialog/pin",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<any[]>> => {
                    return this.dialogueCallbacks.pinDialog(url, info, sessionID);
                },
            },
            {
                url: "/client/mail/dialog/unpin",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<any[]>> => {
                    return this.dialogueCallbacks.unpinDialog(url, info, sessionID);
                },
            },
            {
                url: "/client/mail/dialog/read",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<any[]>> => {
                    return this.dialogueCallbacks.setRead(url, info, sessionID);
                },
            },
            {
                url: "/client/mail/dialog/getAllAttachments",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<IGetAllAttachmentsResponse>> => {
                    return this.dialogueCallbacks.getAllAttachments(url, info, sessionID);
                },
            },
            {
                url: "/client/mail/msg/send",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<string>> => {
                    return this.dialogueCallbacks.sendMessage(url, info, sessionID);
                },
            },
            {
                url: "/client/mail/dialog/clear",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<any[]>> => {
                    return this.dialogueCallbacks.clearMail(url, info, sessionID);
                },
            },
            {
                url: "/client/mail/dialog/group/create",
                action: async (
                    url: string,
                    info: ICreateGroupMailRequest,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<any[]>> => {
                    return this.dialogueCallbacks.createGroupMail(url, info, sessionID);
                },
            },
            {
                url: "/client/mail/dialog/group/owner/change",
                action: async (
                    url: string,
                    info: IChangeGroupMailOwnerRequest,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<any[]>> => {
                    return this.dialogueCallbacks.changeMailGroupOwner(url, info, sessionID);
                },
            },
            {
                url: "/client/mail/dialog/group/users/add",
                action: async (
                    url: string,
                    info: IAddUserGroupMailRequest,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<any[]>> => {
                    return this.dialogueCallbacks.addUserToMail(url, info, sessionID);
                },
            },
            {
                url: "/client/mail/dialog/group/users/remove",
                action: async (
                    url: string,
                    info: IRemoveUserGroupMailRequest,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<any[]>> => {
                    return this.dialogueCallbacks.removeUserFromMail(url, info, sessionID);
                },
            },
            {
                url: "/client/friend/list",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<IGetFriendListDataResponse>> => {
                    return this.dialogueCallbacks.getFriendList(url, info, sessionID);
                },
            },
            {
                url: "/client/friend/request/list/outbox",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<any[]>> => {
                    return this.dialogueCallbacks.listOutbox(url, info, sessionID);
                },
            },
            {
                url: "/client/friend/request/list/inbox",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<any[]>> => {
                    return this.dialogueCallbacks.listInbox(url, info, sessionID);
                },
            },
            {
                url: "/client/friend/request/send",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<IFriendRequestSendResponse>> => {
                    return this.dialogueCallbacks.sendFriendRequest(url, info, sessionID);
                },
            },
            {
                url: "/client/friend/request/accept-all",
                action: (url: string, info: any, sessionID: string, output: string): any => {
                    return this.dialogueCallbacks.acceptAllFriendRequests(url, info, sessionID);
                },
            },
            {
                url: "/client/friend/request/accept",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<boolean>> => {
                    return this.dialogueCallbacks.acceptFriendRequest(url, info, sessionID);
                },
            },
            {
                url: "/client/friend/request/decline",
                action: (url: string, info: any, sessionID: string, output: string): any => {
                    return this.dialogueCallbacks.declineFriendRequest(url, info, sessionID);
                },
            },
            {
                url: "/client/friend/request/cancel",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<boolean>> => {
                    return this.dialogueCallbacks.cancelFriendRequest(url, info, sessionID);
                },
            },
            {
                url: "/client/friend/delete",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<INullResponseData> => {
                    return this.dialogueCallbacks.deleteFriend(url, info, sessionID);
                },
            },
            {
                url: "/client/friend/ignore/set",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<INullResponseData> => {
                    return this.dialogueCallbacks.ignoreFriend(url, info, sessionID);
                },
            },
            {
                url: "/client/friend/ignore/remove",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<INullResponseData> => {
                    return this.dialogueCallbacks.unIgnoreFriend(url, info, sessionID);
                },
            },
        ]);
    }
}
