import { HideoutCallbacks } from "@spt/callbacks/HideoutCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "@spt/di/Router";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { HideoutEventActions } from "@spt/models/enums/HideoutEventActions";
import { inject, injectable } from "tsyringe";

@injectable()
export class HideoutItemEventRouter extends ItemEventRouterDefinition {
    protected hideoutCallbacks: HideoutCallbacks;
    constructor(@inject("HideoutCallbacks") hideoutCallbacks: HideoutCallbacks) {
        super();
        this.hideoutCallbacks = hideoutCallbacks;
    }

    public override getHandledRoutes(): HandledRoute[] {
        return [
            { route: HideoutEventActions.HIDEOUT_UPGRADE, dynamic: false },
            { route: HideoutEventActions.HIDEOUT_UPGRADE_COMPLETE, dynamic: false },
            { route: HideoutEventActions.HIDEOUT_PUT_ITEMS_IN_AREA_SLOTS, dynamic: false },
            { route: HideoutEventActions.HIDEOUT_TAKE_ITEMS_FROM_AREA_SLOTS, dynamic: false },
            { route: HideoutEventActions.HIDEOUT_TOGGLE_AREA, dynamic: false },
            { route: HideoutEventActions.HIDEOUT_SINGLE_PRODUCTION_START, dynamic: false },
            { route: HideoutEventActions.HIDEOUT_SCAV_CASE_PRODUCTION_START, dynamic: false },
            { route: HideoutEventActions.HIDEOUT_CONTINUOUS_PRODUCTION_START, dynamic: false },
            { route: HideoutEventActions.HIDEOUT_TAKE_PRODUCTION, dynamic: false },
            { route: HideoutEventActions.HIDEOUT_RECORD_SHOOTING_RANGE_POINTS, dynamic: false },
            { route: HideoutEventActions.HIDEOUT_IMPROVE_AREA, dynamic: false },
            { route: HideoutEventActions.HIDEOUT_CANCEL_PRODUCTION_COMMAND, dynamic: false },
            { route: HideoutEventActions.HIDEOUT_CIRCLE_OF_CULTIST_PRODUCTION_START, dynamic: false },
            { route: HideoutEventActions.HIDEOUT_DELETE_PRODUCTION_COMMAND, dynamic: false },
            { route: HideoutEventActions.HIDEOUT_CUSTOMIZATION_APPLY_COMMAND, dynamic: false },
            { route: HideoutEventActions.HIDEOUT_CUSTOMIZATION_SET_MANNEQUIN_POSE, dynamic: false },
        ];
    }

    public override async handleItemEvent(
        url: HideoutEventActions,
        pmcData: IPmcData,
        body: any,
        sessionID: string,
        output: IItemEventRouterResponse
    ): Promise<IItemEventRouterResponse> {
        switch (url) {
            case HideoutEventActions.HIDEOUT_UPGRADE:
                return this.hideoutCallbacks.upgrade(pmcData, body, sessionID, output);
            case HideoutEventActions.HIDEOUT_UPGRADE_COMPLETE:
                return this.hideoutCallbacks.upgradeComplete(pmcData, body, sessionID, output);
            case HideoutEventActions.HIDEOUT_PUT_ITEMS_IN_AREA_SLOTS:
                return this.hideoutCallbacks.putItemsInAreaSlots(pmcData, body, sessionID);
            case HideoutEventActions.HIDEOUT_TAKE_ITEMS_FROM_AREA_SLOTS:
                return this.hideoutCallbacks.takeItemsFromAreaSlots(pmcData, body, sessionID);
            case HideoutEventActions.HIDEOUT_TOGGLE_AREA:
                return this.hideoutCallbacks.toggleArea(pmcData, body, sessionID);
            case HideoutEventActions.HIDEOUT_SINGLE_PRODUCTION_START:
                return this.hideoutCallbacks.singleProductionStart(pmcData, body, sessionID);
            case HideoutEventActions.HIDEOUT_SCAV_CASE_PRODUCTION_START:
                return this.hideoutCallbacks.scavCaseProductionStart(pmcData, body, sessionID);
            case HideoutEventActions.HIDEOUT_CONTINUOUS_PRODUCTION_START:
                return this.hideoutCallbacks.continuousProductionStart(pmcData, body, sessionID);
            case HideoutEventActions.HIDEOUT_TAKE_PRODUCTION:
                return this.hideoutCallbacks.takeProduction(pmcData, body, sessionID);
            case HideoutEventActions.HIDEOUT_RECORD_SHOOTING_RANGE_POINTS:
                return this.hideoutCallbacks.recordShootingRangePoints(pmcData, body, sessionID, output);
            case HideoutEventActions.HIDEOUT_IMPROVE_AREA:
                return this.hideoutCallbacks.improveArea(pmcData, body, sessionID);
            case HideoutEventActions.HIDEOUT_CANCEL_PRODUCTION_COMMAND:
                return this.hideoutCallbacks.cancelProduction(pmcData, body, sessionID);
            case HideoutEventActions.HIDEOUT_CIRCLE_OF_CULTIST_PRODUCTION_START:
                return this.hideoutCallbacks.circleOfCultistProductionStart(pmcData, body, sessionID);
            case HideoutEventActions.HIDEOUT_DELETE_PRODUCTION_COMMAND:
                return this.hideoutCallbacks.hideoutDeleteProductionCommand(pmcData, body, sessionID);
            case HideoutEventActions.HIDEOUT_CUSTOMIZATION_APPLY_COMMAND:
                return this.hideoutCallbacks.hideoutCustomizationApplyCommand(pmcData, body, sessionID);
            case HideoutEventActions.HIDEOUT_CUSTOMIZATION_SET_MANNEQUIN_POSE:
                return this.hideoutCallbacks.hideoutCustomizationSetMannequinPose(pmcData, body, sessionID);
        }
    }
}
