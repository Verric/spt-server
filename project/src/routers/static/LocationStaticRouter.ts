import { LocationCallbacks } from "@spt/callbacks/LocationCallbacks";
import { RouteAction, StaticRouter } from "@spt/di/Router";
import { ILocationsGenerateAllResponse } from "@spt/models/eft/common/ILocationsSourceDestinationBase";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { IGetAirdropLootResponse } from "@spt/models/eft/location/IGetAirdropLootResponse";
import { inject, injectable } from "tsyringe";

@injectable()
export class LocationStaticRouter extends StaticRouter {
    constructor(@inject("LocationCallbacks") protected locationCallbacks: LocationCallbacks) {
        super([
            {
                url: "/client/locations",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<ILocationsGenerateAllResponse>> => {
                    return this.locationCallbacks.getLocationData(url, info, sessionID);
                },
            },
            {
                url: "/client/airdrop/loot",
                action: async (
                    url: string,
                    info: any,
                    sessionID: string,
                    output: string
                ): Promise<IGetBodyResponseData<IGetAirdropLootResponse>> => {
                    return this.locationCallbacks.getAirdropLoot(url, info, sessionID);
                },
            },
        ]);
    }
}
