import { TradeCallbacks } from "@spt/callbacks/TradeCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "@spt/di/Router";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { inject, injectable } from "tsyringe";

@injectable()
export class TradeItemEventRouter extends ItemEventRouterDefinition {
    protected tradeCallbacks: TradeCallbacks;
    constructor(@inject("TradeCallbacks") tradeCallbacks: TradeCallbacks) {
        super();
        this.tradeCallbacks = tradeCallbacks;
    }

    public override getHandledRoutes(): HandledRoute[] {
        return [
            { route: "TradingConfirm", dynamic: false },
            { route: "RagFairBuyOffer", dynamic: false },
            { route: "SellAllFromSavage", dynamic: false },
        ];
    }

    public override async handleItemEvent(
        url: "TradingConfirm" | "RagFairBuyOffer" | "SellAllFromSavage",
        pmcData: IPmcData,
        body: any,
        sessionID: string
    ): Promise<IItemEventRouterResponse> {
        switch (url) {
            case "TradingConfirm":
                return this.tradeCallbacks.processTrade(pmcData, body, sessionID);
            case "RagFairBuyOffer":
                return this.tradeCallbacks.processRagfairTrade(pmcData, body, sessionID);
            case "SellAllFromSavage":
                return this.tradeCallbacks.sellAllFromSavage(pmcData, body, sessionID);
        }
    }
}
