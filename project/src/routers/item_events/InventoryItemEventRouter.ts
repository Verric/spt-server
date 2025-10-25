import { HideoutCallbacks } from "@spt/callbacks/HideoutCallbacks";
import { InventoryCallbacks } from "@spt/callbacks/InventoryCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "@spt/di/Router";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { ItemEventActions } from "@spt/models/enums/ItemEventActions";
import { inject, injectable } from "tsyringe";

@injectable()
export class InventoryItemEventRouter extends ItemEventRouterDefinition {
    protected inventoryCallbacks: InventoryCallbacks;
    protected hideoutCallbacks: HideoutCallbacks;
    constructor(
        @inject("InventoryCallbacks") inventoryCallbacks: InventoryCallbacks,
        @inject("HideoutCallbacks") hideoutCallbacks: HideoutCallbacks
    ) {
        super();
        this.inventoryCallbacks = inventoryCallbacks;
        this.hideoutCallbacks = hideoutCallbacks;
    }

    public override getHandledRoutes(): HandledRoute[] {
        return [
            { route: ItemEventActions.MOVE, dynamic: false },
            { route: ItemEventActions.REMOVE, dynamic: false },
            { route: ItemEventActions.SPLIT, dynamic: false },
            { route: ItemEventActions.MERGE, dynamic: false },
            { route: ItemEventActions.TRANSFER, dynamic: false },
            { route: ItemEventActions.SWAP, dynamic: false },
            { route: ItemEventActions.FOLD, dynamic: false },
            { route: ItemEventActions.TOGGLE, dynamic: false },
            { route: ItemEventActions.TAG, dynamic: false },
            { route: ItemEventActions.BIND, dynamic: false },
            { route: ItemEventActions.UNBIND, dynamic: false },
            { route: ItemEventActions.EXAMINE, dynamic: false },
            { route: ItemEventActions.READ_ENCYCLOPEDIA, dynamic: false },
            { route: ItemEventActions.APPLY_INVENTORY_CHANGES, dynamic: false },
            { route: ItemEventActions.CREATE_MAP_MARKER, dynamic: false },
            { route: ItemEventActions.DELETE_MAP_MARKER, dynamic: false },
            { route: ItemEventActions.EDIT_MAP_MARKER, dynamic: false },
            { route: ItemEventActions.OPEN_RANDOM_LOOT_CONTAINER, dynamic: false },
            { route: ItemEventActions.HIDEOUT_QTE_EVENT, dynamic: false },
            { route: ItemEventActions.REDEEM_PROFILE_REWARD, dynamic: false },
            { route: ItemEventActions.SET_FAVORITE_ITEMS, dynamic: false },
            { route: ItemEventActions.QUEST_FAIL, dynamic: false },
            { route: ItemEventActions.PIN_LOCK, dynamic: false },
        ];
    }

    public override async handleItemEvent(
        url: ItemEventActions,
        pmcData: IPmcData,
        body: any,
        sessionID: string,
        output: IItemEventRouterResponse
    ): Promise<IItemEventRouterResponse> {
        switch (url) {
            case ItemEventActions.MOVE:
                return this.inventoryCallbacks.moveItem(pmcData, body, sessionID, output);
            case ItemEventActions.REMOVE:
                return this.inventoryCallbacks.removeItem(pmcData, body, sessionID, output);
            case ItemEventActions.SPLIT:
                return this.inventoryCallbacks.splitItem(pmcData, body, sessionID, output);
            case ItemEventActions.MERGE:
                return this.inventoryCallbacks.mergeItem(pmcData, body, sessionID, output);
            case ItemEventActions.TRANSFER:
                return this.inventoryCallbacks.transferItem(pmcData, body, sessionID, output);
            case ItemEventActions.SWAP:
                return this.inventoryCallbacks.swapItem(pmcData, body, sessionID);
            case ItemEventActions.FOLD:
                return this.inventoryCallbacks.foldItem(pmcData, body, sessionID);
            case ItemEventActions.TOGGLE:
                return this.inventoryCallbacks.toggleItem(pmcData, body, sessionID);
            case ItemEventActions.TAG:
                return this.inventoryCallbacks.tagItem(pmcData, body, sessionID);
            case ItemEventActions.BIND:
                return this.inventoryCallbacks.bindItem(pmcData, body, sessionID, output);
            case ItemEventActions.UNBIND:
                return this.inventoryCallbacks.unbindItem(pmcData, body, sessionID, output);
            case ItemEventActions.EXAMINE:
                return this.inventoryCallbacks.examineItem(pmcData, body, sessionID, output);
            case ItemEventActions.READ_ENCYCLOPEDIA:
                return this.inventoryCallbacks.readEncyclopedia(pmcData, body, sessionID);
            case ItemEventActions.APPLY_INVENTORY_CHANGES:
                return this.inventoryCallbacks.sortInventory(pmcData, body, sessionID, output);
            case ItemEventActions.CREATE_MAP_MARKER:
                return this.inventoryCallbacks.createMapMarker(pmcData, body, sessionID, output);
            case ItemEventActions.DELETE_MAP_MARKER:
                return this.inventoryCallbacks.deleteMapMarker(pmcData, body, sessionID, output);
            case ItemEventActions.EDIT_MAP_MARKER:
                return this.inventoryCallbacks.editMapMarker(pmcData, body, sessionID, output);
            case ItemEventActions.OPEN_RANDOM_LOOT_CONTAINER:
                return this.inventoryCallbacks.openRandomLootContainer(pmcData, body, sessionID, output);
            case ItemEventActions.HIDEOUT_QTE_EVENT:
                return this.hideoutCallbacks.handleQTEEvent(pmcData, body, sessionID, output);
            case ItemEventActions.REDEEM_PROFILE_REWARD:
                return this.inventoryCallbacks.redeemProfileReward(pmcData, body, sessionID, output);
            case ItemEventActions.SET_FAVORITE_ITEMS:
                return this.inventoryCallbacks.setFavoriteItem(pmcData, body, sessionID, output);
            case ItemEventActions.QUEST_FAIL:
                return this.inventoryCallbacks.failQuest(pmcData, body, sessionID, output);
            case ItemEventActions.PIN_LOCK:
                return this.inventoryCallbacks.pinOrLock(pmcData, body, sessionID, output);
            default:
                throw new Error(`Unhandled event ${url} request: ${JSON.stringify(body)}`);
        }
    }
}
