import type { PrestigeCallbacks } from "@spt/callbacks/PrestigeCallbacks";
import { StaticRouter } from "@spt/di/Router";
import type { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { inject, injectable } from "tsyringe";

@injectable()
export class PrestigeStaticRouter extends StaticRouter {
    constructor(@inject("PrestigeCallbacks") protected prestigeCallbacks: PrestigeCallbacks) {
        super([
            {
                url: "/client/prestige/list",
                action: async (url, info, sessionID): Promise<IGetBodyResponseData<any>> => {
                    return this.prestigeCallbacks.getPrestige(url, info, sessionID);
                },
            },

            {
                url: "/client/prestige/obtain",
                action: async (url, info: any, sessionID): Promise<INullResponseData> => {
                    return await this.prestigeCallbacks.obtainPrestige(url, info, sessionID);
                },
            },
        ]);
    }
}
