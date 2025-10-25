import { NotifierCallbacks } from "@spt/callbacks/NotifierCallbacks";
import { DynamicRouter } from "@spt/di/Router";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { inject, injectable } from "tsyringe";

@injectable()
export class NotifierDynamicRouter extends DynamicRouter {
    constructor(@inject("NotifierCallbacks") notifierCallbacks: NotifierCallbacks) {
        super([
            {
                url: "/?last_id",
                action: async (url, info, sessionID, output): Promise<string> => {
                    return notifierCallbacks.notify(url, info, sessionID);
                },
            },
            {
                url: "/notifierServer",
                action: async (url, info, sessionID, output): Promise<string> => {
                    return notifierCallbacks.notify(url, info, sessionID);
                },
            },
            {
                url: "/push/notifier/get/",
                action: async (url, info, sessionID, output): Promise<IGetBodyResponseData<any[]>> => {
                    return notifierCallbacks.getNotifier(url, info, sessionID);
                },
            },
            {
                url: "/push/notifier/getwebsocket/",
                action: async (url, info, sessionID, output): Promise<IGetBodyResponseData<any[]>> => {
                    return notifierCallbacks.getNotifier(url, info, sessionID);
                },
            },
        ]);
    }
}
