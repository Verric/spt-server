import { CustomizationCallbacks } from "@spt/callbacks/CustomizationCallbacks";
import { StaticRouter } from "@spt/di/Router";
import { ICustomisationStorage } from "@spt/models/eft/common/tables/ICustomisationStorage";
import { IHideoutCustomisation } from "@spt/models/eft/hideout/IHideoutCustomisation";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { inject, injectable } from "tsyringe";

@injectable()
export class CustomizationStaticRouter extends StaticRouter {
    constructor(@inject("CustomizationCallbacks") customizationCallbacks: CustomizationCallbacks) {
        super([
            {
                url: "/client/trading/customization/storage",
                action: async (url, info, sessionID): Promise<IGetBodyResponseData<ICustomisationStorage[]>> => {
                    return customizationCallbacks.getCustomisationUnlocks(url, info, sessionID);
                },
            },
            {
                url: "/client/hideout/customization/offer/list",
                action: async (url, info, sessionID): Promise<IGetBodyResponseData<IHideoutCustomisation>> => {
                    return customizationCallbacks.getHideoutCustomisation(url, info, sessionID);
                },
            },
            {
                url: "/client/customization/storage",
                action: async (url, info, sessionID): Promise<IGetBodyResponseData<ICustomisationStorage[]>> => {
                    return customizationCallbacks.getStorage(url, info, sessionID);
                },
            },
        ]);
    }
}
