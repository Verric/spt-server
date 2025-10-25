import { InsuranceCallbacks } from "@spt/callbacks/InsuranceCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "@spt/di/Router";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { inject, injectable } from "tsyringe";

@injectable()
export class InsuranceItemEventRouter extends ItemEventRouterDefinition {
    protected insuranceCallbacks: InsuranceCallbacks;
    constructor(
        @inject("InsuranceCallbacks") insuranceCallbacks: InsuranceCallbacks // TODO: delay required
    ) {
        super();
        this.insuranceCallbacks = insuranceCallbacks;
    }

    public override getHandledRoutes(): HandledRoute[] {
        return [{ route: "Insure", dynamic: false }];
    }

    public override async handleItemEvent(
        url: "Insure",
        pmcData: IPmcData,
        body: any,
        sessionID: string
    ): Promise<IItemEventRouterResponse> {
        switch (url) {
            case "Insure":
                return this.insuranceCallbacks.insure(pmcData, body, sessionID);
        }
    }
}
