import { CustomizationController } from "@spt/controllers/CustomizationController";
import type { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import type { IPmcData } from "@spt/models/eft/common/IPmcData";
import type { ICustomisationStorage } from "@spt/models/eft/common/tables/ICustomisationStorage";
import type { ISuit } from "@spt/models/eft/common/tables/ITrader";
import type { IBuyClothingRequestData } from "@spt/models/eft/customization/IBuyClothingRequestData";
import type { ICustomizationSetRequest } from "@spt/models/eft/customization/ICustomizationSetRequest";
import type { IHideoutCustomisation } from "@spt/models/eft/hideout/IHideoutCustomisation";
import type { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import type { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { SaveServer } from "@spt/servers/SaveServer";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { inject, injectable } from "tsyringe";

@injectable()
export class CustomizationCallbacks {
    protected customizationController: CustomizationController;
    protected saveServer: SaveServer;
    protected httpResponse: HttpResponseUtil;

    constructor(
        @inject("CustomizationController") customizationController: CustomizationController,
        @inject("SaveServer") saveServer: SaveServer,
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
    ) {
        this.customizationController = customizationController;
        this.saveServer = saveServer;
        this.httpResponse = httpResponse;
    }

    /**
     * Handle client/trading/customization/storage
     * @returns IGetSuitsResponse
     */
    public getCustomisationUnlocks(
        _url: string,
        _info: IEmptyRequestData,
        sessionID: string,
    ): IGetBodyResponseData<ICustomisationStorage[]> {
        return this.httpResponse.getBody(this.saveServer.getProfile(sessionID).customisationUnlocks);
    }

    /**
     * Handle client/trading/customization
     * @returns ISuit[]
     */
    public getTraderSuits(url: string, _info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<ISuit[]> {
        const splittedUrl = url.split("/");
        const traderID = splittedUrl[splittedUrl.length - 3];

        return this.httpResponse.getBody(this.customizationController.getTraderSuits(traderID, sessionID));
    }

    /**
     * Handle CustomizationBuy event
     */
    public buyCustomisation(
        pmcData: IPmcData,
        body: IBuyClothingRequestData,
        sessionID: string,
    ): IItemEventRouterResponse {
        return this.customizationController.buyCustomisation(pmcData, body, sessionID);
    }

    /** Handle client/hideout/customization/offer/list */
    public getHideoutCustomisation(
        _url: string,
        info: IEmptyRequestData,
        sessionID: string,
    ): IGetBodyResponseData<IHideoutCustomisation> {
        return this.httpResponse.getBody(this.customizationController.getHideoutCustomisation(sessionID, info));
    }

    /** Handle client/customization/storage */
    public getStorage(
        _url: string,
        request: IEmptyRequestData,
        sessionID: string,
    ): IGetBodyResponseData<ICustomisationStorage[]> {
        return this.httpResponse.getBody(this.customizationController.getCustomisationStorage(sessionID, request));
    }

    /** Handle CustomizationSet */
    public setCustomisation(
        pmcData: IPmcData,
        request: ICustomizationSetRequest,
        sessionID: string,
    ): IItemEventRouterResponse {
        return this.customizationController.setCustomisation(sessionID, request, pmcData);
    }
}
