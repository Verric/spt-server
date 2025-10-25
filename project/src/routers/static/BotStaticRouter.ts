import { BotCallbacks } from "@spt/callbacks/BotCallbacks";
import { StaticRouter } from "@spt/di/Router";
import { IBotBase } from "@spt/models/eft/common/tables/IBotBase";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { inject, injectable } from "tsyringe";

@injectable()
export class BotStaticRouter extends StaticRouter {
    constructor(@inject("BotCallbacks") botCallbacks: BotCallbacks) {
        super([
            {
                url: "/client/game/bot/generate",
                action: async (url, info, sessionID, output): Promise<IGetBodyResponseData<IBotBase[]>> => {
                    return botCallbacks.generateBots(url, info, sessionID);
                },
            },
        ]);
    }
}
