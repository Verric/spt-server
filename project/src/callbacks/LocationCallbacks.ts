import { LocationController } from "@spt/controllers/LocationController";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { ILocationsGenerateAllResponse } from "@spt/models/eft/common/ILocationsSourceDestinationBase";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { IGetAirdropLootRequest } from "@spt/models/eft/location/IGetAirdropLootRequest";
import { IGetAirdropLootResponse } from "@spt/models/eft/location/IGetAirdropLootResponse";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { inject, injectable } from "tsyringe";

@injectable()
export class LocationCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected locationController: LocationController;

    constructor(
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("LocationController") locationController: LocationController,
    ) {
        this.httpResponse = httpResponse;
        this.locationController = locationController;
    }

    /** Handle client/locations */
    public getLocationData(
        _url: string,
        _info: IEmptyRequestData,
        sessionID: string,
    ): IGetBodyResponseData<ILocationsGenerateAllResponse> {
        return this.httpResponse.getBody(this.locationController.generateAll(sessionID));
    }

    /** Handle client/airdrop/loot */
    public getAirdropLoot(
        _url: string,
        info: IGetAirdropLootRequest,
        _sessionID: string,
    ): IGetBodyResponseData<IGetAirdropLootResponse> {
        return this.httpResponse.getBody(this.locationController.getAirdropLoot(info));
    }
}
