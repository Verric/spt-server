import { ClientLogCallbacks } from "@spt/callbacks/ClientLogCallbacks";
import { StaticRouter } from "@spt/di/Router";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { inject, injectable } from "tsyringe";

@injectable()
export class ClientLogStaticRouter extends StaticRouter {
    constructor(@inject("ClientLogCallbacks") clientLogCallbacks: ClientLogCallbacks) {
        super([
            {
                url: "/singleplayer/log",
                action: async (url, info, sessionID): Promise<INullResponseData> => {
                    return clientLogCallbacks.clientLog(url, info, sessionID);
                },
            },
            {
                url: "/singleplayer/release",
                action: async (): Promise<string> => clientLogCallbacks.releaseNotes(),
            },
            {
                url: "/singleplayer/enableBSGlogging",
                action: async (): Promise<string> => clientLogCallbacks.bsgLogging(),
            },
        ]);
    }
}
