import { DynamicRouter } from "@spt/di/Router";
import { injectable } from "tsyringe";

@injectable()
export class LocationDynamicRouter extends DynamicRouter {
    constructor() {
        super([]);
    }

    public override getTopLevelRoute(): string {
        return "spt-loot";
    }
}
