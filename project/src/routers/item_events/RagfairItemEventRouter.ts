import { RagfairCallbacks } from "@spt/callbacks/RagfairCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "@spt/di/Router";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { inject, injectable } from "tsyringe";

@injectable()
export class RagfairItemEventRouter extends ItemEventRouterDefinition {
    protected ragfairCallbacks: RagfairCallbacks;
    constructor(@inject("RagfairCallbacks") ragfairCallbacks: RagfairCallbacks) {
        super();
        this.ragfairCallbacks = ragfairCallbacks;
    }

    public override getHandledRoutes(): HandledRoute[] {
        return [
            { route: "RagFairAddOffer", dynamic: false },
            { route: "RagFairRemoveOffer", dynamic: false },
            { route: "RagFairRenewOffer", dynamic: false },
        ];
    }

    public override async handleItemEvent(
        url: "RagFairAddOffer" | "RagFairRemoveOffer" | "RagFairRenewOffer",
        pmcData: IPmcData,
        body: any,
        sessionID: string
    ): Promise<IItemEventRouterResponse> {
        switch (url) {
            case "RagFairAddOffer":
                return this.ragfairCallbacks.addOffer(pmcData, body, sessionID);
            case "RagFairRemoveOffer":
                return this.ragfairCallbacks.removeOffer(pmcData, body, sessionID);
            case "RagFairRenewOffer":
                return this.ragfairCallbacks.extendOffer(pmcData, body, sessionID);
        }
    }
}
