import { TraderCallbacks } from "@spt/callbacks/TraderCallbacks";
import { DynamicRouter } from "@spt/di/Router";
import { ITraderAssort, ITraderBase } from "@spt/models/eft/common/tables/ITrader";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { inject, injectable } from "tsyringe";

@injectable()
export class TraderDynamicRouter extends DynamicRouter {
    constructor(@inject("TraderCallbacks") traderCallbacks: TraderCallbacks) {
        super([
            {
                url: "/client/trading/api/getTrader/",
                action: async (url, info, sessionID, output): Promise<IGetBodyResponseData<ITraderBase>> => {
                    return traderCallbacks.getTrader(url, info, sessionID);
                },
            },
            {
                url: "/client/trading/api/getTraderAssort/",
                action: async (url, info, sessionID, output): Promise<IGetBodyResponseData<ITraderAssort>> => {
                    return traderCallbacks.getAssort(url, info, sessionID);
                },
            },
        ]);
    }
}
