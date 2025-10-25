import { InraidCallbacks } from "@spt/callbacks/InraidCallbacks";
import { DynamicRouter } from "@spt/di/Router";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { inject, injectable } from "tsyringe";

@injectable()
export class InraidDynamicRouter extends DynamicRouter {
    constructor(@inject("InraidCallbacks") inraidCallbacks: InraidCallbacks) {
        super([
            {
                url: "/client/location/getLocalloot",
                action: async (url, info, sessionID, output): Promise<INullResponseData> => {
                    return inraidCallbacks.registerPlayer(url, info, sessionID);
                },
            },
        ]);
    }

    public override getTopLevelRoute(): string {
        return "spt-name";
    }
}
