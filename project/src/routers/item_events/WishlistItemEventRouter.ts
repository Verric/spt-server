import { WishlistCallbacks } from "@spt/callbacks/WishlistCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "@spt/di/Router";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { inject, injectable } from "tsyringe";

@injectable()
export class WishlistItemEventRouter extends ItemEventRouterDefinition {
    protected wishlistCallbacks: WishlistCallbacks;
    constructor(@inject("WishlistCallbacks") wishlistCallbacks: WishlistCallbacks) {
        super();
        this.wishlistCallbacks = wishlistCallbacks;
    }

    public override getHandledRoutes(): HandledRoute[] {
        return [
            { route: "AddToWishList", dynamic: false },
            { route: "RemoveFromWishList", dynamic: false },
            { route: "ChangeWishlistItemCategory", dynamic: false },
        ];
    }

    public override async handleItemEvent(
        url: "AddToWishList" | "RemoveFromWishList" | "ChangeWishlistItemCategory",
        pmcData: IPmcData,
        request: any,
        sessionID: string
    ): Promise<IItemEventRouterResponse> {
        switch (url) {
            case "AddToWishList":
                return this.wishlistCallbacks.addToWishlist(pmcData, request, sessionID);
            case "RemoveFromWishList":
                return this.wishlistCallbacks.removeFromWishlist(pmcData, request, sessionID);
            case "ChangeWishlistItemCategory":
                return this.wishlistCallbacks.changeWishlistItemCategory(pmcData, request, sessionID);
        }
    }
}
