import { BotCallbacks } from "@spt/callbacks/BotCallbacks";
import { DynamicRouter } from "@spt/di/Router";
import { IDifficulties } from "@spt/models/eft/common/tables/IBotType";
import { inject, injectable } from "tsyringe";

@injectable()
export class BotDynamicRouter extends DynamicRouter {
    constructor(@inject("BotCallbacks") botCallbacks: BotCallbacks) {
        super([
            {
                url: "/singleplayer/settings/bot/limit/",
                action: async (url, info, sessionID, output): Promise<string> => {
                    return botCallbacks.getBotLimit(url, info, sessionID);
                },
            },
            {
                url: "/singleplayer/settings/bot/difficulty/",
                action: async (url, info, sessionID, output): Promise<string> => {
                    return botCallbacks.getBotDifficulty(url, info, sessionID);
                },
            },
            {
                url: "/singleplayer/settings/bot/difficulties",
                action: async (url, info, sessionID, output): Promise<Record<string, IDifficulties>> => {
                    return botCallbacks.getAllBotDifficulties(url, info, sessionID);
                },
            },
            {
                url: "/singleplayer/settings/bot/maxCap",
                action: async (url, info, sessionID, output): Promise<string> => {
                    return botCallbacks.getBotCap(url, info, sessionID);
                },
            },
            {
                url: "/singleplayer/settings/bot/getBotBehaviours/",
                action: async (url, info, sessionID, output): Promise<string> => {
                    return botCallbacks.getBotBehaviours();
                },
            },
        ]);
    }
}
