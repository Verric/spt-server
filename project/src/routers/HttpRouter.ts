import { IncomingMessage } from "node:http";
import { DynamicRouter, Router, StaticRouter } from "@spt/di/Router";
import { injectAll, injectable } from "tsyringe";

@injectable()
export class HttpRouter {
    constructor(
        @injectAll("StaticRoutes") protected staticRouters: StaticRouter[],
        @injectAll("DynamicRoutes") protected dynamicRoutes: DynamicRouter[]
    ) {}

    public async getResponse(req: IncomingMessage, info: any, sessionID: string): Promise<string> {
        const wrapper: ResponseWrapper = { output: "" };
        let url = req.url;

        // remove retry from url
        if (url?.includes("?retry=")) {
            url = url.split("?retry=")[0];
        }
        const handled = await this.handleRoute(url, info, sessionID, wrapper, this.staticRouters, false);
        if (!handled) {
            await this.handleRoute(url, info, sessionID, wrapper, this.dynamicRoutes, true);
        }

        // TODO: Temporary hack to change ItemEventRouter response sessionID binding to what client expects
        if (wrapper.output?.includes('"profileChanges":{')) {
            wrapper.output = wrapper.output.replace(sessionID, sessionID);
        }

        return wrapper.output;
    }

    protected async handleRoute(
        url: string,
        info: any,
        sessionID: string,
        wrapper: ResponseWrapper,
        routers: Router[],
        dynamic: boolean
    ): Promise<boolean> {
        let matched = false;
        for (const route of routers) {
            if (route.canHandle(url, dynamic)) {
                if (dynamic) {
                    wrapper.output = await (route as DynamicRouter).handleDynamic(url, info, sessionID, wrapper.output);
                } else {
                    wrapper.output = await (route as StaticRouter).handleStatic(url, info, sessionID, wrapper.output);
                }
                matched = true;
            }
        }
        return matched;
    }
}

interface ResponseWrapper {
    output: string;
}
