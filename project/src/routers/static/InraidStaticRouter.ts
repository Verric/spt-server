import { InraidCallbacks } from "@spt/callbacks/InraidCallbacks";
import { RouteAction, StaticRouter } from "@spt/di/Router";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { inject, injectable } from "tsyringe";

@injectable()
export class InraidStaticRouter extends StaticRouter {
    constructor(@inject("InraidCallbacks") protected inraidCallbacks: InraidCallbacks) {
        super([
            {
                url: "/raid/profile/scavsave",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<INullResponseData> => {
                    return this.inraidCallbacks.saveProgress(url, info, sessionID);
                },
            },
            {
                url: "/singleplayer/settings/raid/menu",
                action: async (url: string, info: any, sessionID: string, output: string): Promise<string> => {
                    return this.inraidCallbacks.getRaidMenuSettings();
                },
            },
            {
                url: "/singleplayer/scav/traitorscavhostile",
                action: async (url: string, info: any, sessionID: string, output: string): Promise<string> => {
                    return this.inraidCallbacks.getTraitorScavHostileChance(url, info, sessionID);
                },
            },
            {
                url: "/singleplayer/bosstypes",
                action: async (url: string, info: any, sessionID: string, output: string): Promise<string> => {
                    return this.inraidCallbacks.getBossTypes(url, info, sessionID);
                },
            },
        ]);
    }
}
