import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { ISptProfile } from "@spt/models/eft/profile/ISptProfile";

export abstract class Router {
    protected handledRoutes: HandledRoute[] = [];

    public getTopLevelRoute(): string {
        return "spt";
    }

    protected getHandledRoutes(): HandledRoute[] {
        throw new Error("This method needs to be overrode by the router classes");
    }

    protected getInternalHandledRoutes(): HandledRoute[] {
        if (this.handledRoutes.length === 0) {
            this.handledRoutes = this.getHandledRoutes();
        }
        return this.handledRoutes;
    }

    public canHandle(url: string, partialMatch = false): boolean {
        if (partialMatch) {
            return this.getInternalHandledRoutes()
                .filter((r) => r.dynamic)
                .some((r) => url.includes(r.route));
        }
        return this.getInternalHandledRoutes()
            .filter((r) => !r.dynamic)
            .some((r) => r.route === url);
    }
}

export class StaticRouter extends Router {
    private routes: RouteAction[];
    constructor(routes: RouteAction[]) {
        super();
        this.routes = routes;
    }

    public async handleStatic(url: string, info: any, sessionID: string, output: string): Promise<any> {
        return this.routes.find((route) => route.url === url)?.action(url, info, sessionID, output);
    }

    public override getHandledRoutes(): HandledRoute[] {
        return this.routes.map(({ url }) => ({ route: url, dynamic: false }));
    }
}

export class DynamicRouter extends Router {
    private routes: RouteAction[];
    constructor(routes: RouteAction[]) {
        super();
        this.routes = routes;
    }

    public async handleDynamic(url: string, info: any, sessionID: string, output: string): Promise<any> {
        return this.routes.find((r) => url.includes(r.url))?.action(url, info, sessionID, output);
    }

    public override getHandledRoutes(): HandledRoute[] {
        return this.routes.map(({ url }) => ({ route: url, dynamic: true }));
    }
}

// The name of this class should be ItemEventRouter, but that name is taken,
// So instead I added the definition
export abstract class ItemEventRouterDefinition extends Router {
    public abstract handleItemEvent(
        url: string,
        pmcData: IPmcData,
        body: any,
        sessionID: string,
        output: IItemEventRouterResponse
    ): Promise<any>;
}

export abstract class SaveLoadRouter extends Router {
    public abstract handleLoad(profile: ISptProfile): Promise<ISptProfile>;
}

export interface HandledRoute {
    route: string;
    dynamic: boolean;
}

export interface RouteAction {
    url: string;
    action: (url: string, info: any, sessionID: string, output: string) => Promise<any>;
}
