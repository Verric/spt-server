import { BundleCallbacks } from "@spt/callbacks/BundleCallbacks";
import { StaticRouter } from "@spt/di/Router";
import { inject, injectable } from "tsyringe";

@injectable()
export class BundleStaticRouter extends StaticRouter {
    constructor(@inject("BundleCallbacks") bundleCallbacks: BundleCallbacks) {
        super([
            {
                url: "/singleplayer/bundles",
                action: async (url, info, sessionID): Promise<string> => {
                    return bundleCallbacks.getBundles(url, info, sessionID);
                },
            },
        ]);
    }
}
