import { BundleCallbacks } from "@spt/callbacks/BundleCallbacks";
import { DynamicRouter } from "@spt/di/Router";
import { inject, injectable } from "tsyringe";

@injectable()
export class BundleDynamicRouter extends DynamicRouter {
    constructor(@inject("BundleCallbacks") bundleCallbacks: BundleCallbacks) {
        super([
            {
                url: "/files/bundle",
                action: (url, info, sessionID, output): any => {
                    return bundleCallbacks.getBundle(url, info, sessionID);
                },
            },
        ]);
    }
}
