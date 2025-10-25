import { HealthCallbacks } from "@spt/callbacks/HealthCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "@spt/di/Router";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { inject, injectable } from "tsyringe";

@injectable()
export class HealthItemEventRouter extends ItemEventRouterDefinition {
    protected healthCallbacks: HealthCallbacks;
    constructor(
        @inject("HealthCallbacks") healthCallbacks: HealthCallbacks // TODO: delay required
    ) {
        super();
        this.healthCallbacks = healthCallbacks;
    }

    public override getHandledRoutes(): HandledRoute[] {
        return [
            { route: "Eat", dynamic: false },
            { route: "Heal", dynamic: false },
            { route: "RestoreHealth", dynamic: false },
        ];
    }

    public override async handleItemEvent(
        url: "Eat" | "Heal" | "RestoreHealth",
        pmcData: IPmcData,
        body: any,
        sessionID: string
    ): Promise<IItemEventRouterResponse> {
        switch (url) {
            case "Eat":
                return this.healthCallbacks.offraidEat(pmcData, body, sessionID);
            case "Heal":
                return this.healthCallbacks.offraidHeal(pmcData, body, sessionID);
            case "RestoreHealth":
                return this.healthCallbacks.healthTreatment(pmcData, body, sessionID);
        }
    }
}
