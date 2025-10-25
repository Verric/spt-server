import { CustomizationCallbacks } from "@spt/callbacks/CustomizationCallbacks";
import { DynamicRouter } from "@spt/di/Router";
import { ISuit } from "@spt/models/eft/common/tables/ITrader";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { inject, injectable } from "tsyringe";

@injectable()
export class CustomizationDynamicRouter extends DynamicRouter {
    constructor(@inject("CustomizationCallbacks") customizationCallbacks: CustomizationCallbacks) {
        super([
            {
                url: "/client/trading/customization/",
                action: async (url, info, sessionID, output): Promise<IGetBodyResponseData<ISuit[]>> => {
                    return customizationCallbacks.getTraderSuits(url, info, sessionID);
                },
            },
        ]);
    }
}
