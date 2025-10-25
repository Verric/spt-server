import { DataCallbacks } from "@spt/callbacks/DataCallbacks";
import { DynamicRouter } from "@spt/di/Router";
import { IGetItemPricesResponse } from "@spt/models/eft/game/IGetItemPricesResponse";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { inject, injectable } from "tsyringe";

@injectable()
export class DataDynamicRouter extends DynamicRouter {
    constructor(@inject("DataCallbacks") dataCallbacks: DataCallbacks) {
        super([
            {
                url: "/client/menu/locale/",
                action: async (url, info, sessionID, output): Promise<IGetBodyResponseData<string>> => {
                    return dataCallbacks.getLocalesMenu(url, info, sessionID);
                },
            },
            {
                url: "/client/locale/",
                action: async (url, info, sessionID, output): Promise<string> => {
                    return dataCallbacks.getLocalesGlobal(url, info, sessionID);
                },
            },
            {
                url: "/client/items/prices/",
                action: async (url, info, sessionID, output): Promise<IGetBodyResponseData<IGetItemPricesResponse>> => {
                    return dataCallbacks.getItemPrices(url, info, sessionID);
                },
            },
        ]);
    }
}
