import { LauncherCallbacks } from "@spt/callbacks/LauncherCallbacks";
import { RouteAction, StaticRouter } from "@spt/di/Router";
import { inject, injectable } from "tsyringe";

@injectable()
export class LauncherStaticRouter extends StaticRouter {
    constructor(@inject("LauncherCallbacks") protected launcherCallbacks: LauncherCallbacks) {
        super([
            {
                url: "/launcher/ping",
                action: async (url: string, info: any, sessionID: string, output: string): Promise<string> => {
                    return this.launcherCallbacks.ping(url, info, sessionID);
                },
            },
            {
                url: "/launcher/server/connect",
                action: async (url: string, info: any, sessionID: string, output: string): Promise<string> => {
                    return this.launcherCallbacks.connect();
                },
            },
            {
                url: "/launcher/profile/login",
                action: async (url: string, info: any, sessionID: string, output: string): Promise<string> => {
                    return this.launcherCallbacks.login(url, info, sessionID);
                },
            },
            {
                url: "/launcher/profile/register",
                action: async (url: string, info: any, sessionID: string, output: string): Promise<string> => {
                    return await this.launcherCallbacks.register(url, info, sessionID);
                },
            },
            {
                url: "/launcher/profile/get",
                action: async (url: string, info: any, sessionID: string, output: string): Promise<string> => {
                    return this.launcherCallbacks.get(url, info, sessionID);
                },
            },
            {
                url: "/launcher/profile/change/username",
                action: async (url: string, info: any, sessionID: string, output: string): Promise<string> => {
                    return this.launcherCallbacks.changeUsername(url, info, sessionID);
                },
            },
            {
                url: "/launcher/profile/change/password",
                action: async (url: string, info: any, sessionID: string, output: string): Promise<string> => {
                    return this.launcherCallbacks.changePassword(url, info, sessionID);
                },
            },
            {
                url: "/launcher/profile/change/wipe",
                action: async (url: string, info: any, sessionID: string, output: string): Promise<string> => {
                    return this.launcherCallbacks.wipe(url, info, sessionID);
                },
            },
            {
                url: "/launcher/profile/remove",
                action: async (url: string, info: any, sessionID: string, output: string): Promise<string> => {
                    return await this.launcherCallbacks.removeProfile(url, info, sessionID);
                },
            },
            {
                url: "/launcher/profile/compatibleTarkovVersion",
                action: async (url: string, info: any, sessionID: string, output: string): Promise<string> => {
                    return this.launcherCallbacks.getCompatibleTarkovVersion();
                },
            },
            {
                url: "/launcher/server/version",
                action: async (url: string, info: any, sessionID: string, output: string): Promise<string> => {
                    return this.launcherCallbacks.getServerVersion();
                },
            },
            {
                url: "/launcher/server/loadedServerMods",
                action: async (url: string, info: any, sessionID: string, output: string): Promise<string> => {
                    return this.launcherCallbacks.getLoadedServerMods();
                },
            },
            {
                url: "/launcher/server/serverModsUsedByProfile",
                action: async (url: string, info: any, sessionID: string, output: string): Promise<string> => {
                    return this.launcherCallbacks.getServerModsProfileUsed(url, info, sessionID);
                },
            },
        ]);
    }
}
