import { RepairCallbacks } from "@spt/callbacks/RepairCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "@spt/di/Router";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { inject, injectable } from "tsyringe";

@injectable()
export class RepairItemEventRouter extends ItemEventRouterDefinition {
    protected repairCallbacks: RepairCallbacks;
    constructor(@inject("RepairCallbacks") repairCallbacks: RepairCallbacks) {
        super();
        this.repairCallbacks = repairCallbacks;
    }

    public override getHandledRoutes(): HandledRoute[] {
        return [
            { route: "Repair", dynamic: false },
            { route: "TraderRepair", dynamic: false },
        ];
    }

    public override async handleItemEvent(
        url: "Repair" | "TraderRepair",
        pmcData: IPmcData,
        body: any,
        sessionID: string
    ): Promise<IItemEventRouterResponse> {
        switch (url) {
            case "Repair":
                return this.repairCallbacks.repair(pmcData, body, sessionID);
            case "TraderRepair":
                return this.repairCallbacks.traderRepair(pmcData, body, sessionID);
        }
    }
}
