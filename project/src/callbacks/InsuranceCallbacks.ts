import { InsuranceController } from "@spt/controllers/InsuranceController";
import { OnUpdate } from "@spt/di/OnUpdate";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { IGetInsuranceCostRequestData } from "@spt/models/eft/insurance/IGetInsuranceCostRequestData";
import { IGetInsuranceCostResponseData } from "@spt/models/eft/insurance/IGetInsuranceCostResponseData";
import { IInsureRequestData } from "@spt/models/eft/insurance/IInsureRequestData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { IInsuranceConfig } from "@spt/models/spt/config/IInsuranceConfig";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { InsuranceService } from "@spt/services/InsuranceService";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { inject, injectable } from "tsyringe";

@injectable()
export class InsuranceCallbacks implements OnUpdate {
    protected insuranceConfig: IInsuranceConfig;
    protected insuranceController: InsuranceController;
    protected insuranceService: InsuranceService;
    protected httpResponse: HttpResponseUtil;
    protected configServer: ConfigServer;

    constructor(
        @inject("InsuranceController") insuranceController: InsuranceController,
        @inject("InsuranceService") insuranceService: InsuranceService,
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("ConfigServer") configServer: ConfigServer,
    ) {
        this.insuranceController = insuranceController;
        this.insuranceService = insuranceService;
        this.httpResponse = httpResponse;
        this.configServer = configServer;
        this.insuranceConfig = this.configServer.getConfig(ConfigTypes.INSURANCE);
    }

    /**
     * Handle client/insurance/items/list/cost
     * @returns IGetInsuranceCostResponseData
     */
    public getInsuranceCost(
        _url: string,
        info: IGetInsuranceCostRequestData,
        sessionID: string,
    ): IGetBodyResponseData<IGetInsuranceCostResponseData> {
        return this.httpResponse.getBody(this.insuranceController.cost(info, sessionID));
    }

    /**
     * Handle Insure event
     * @returns IItemEventRouterResponse
     */
    public insure(pmcData: IPmcData, body: IInsureRequestData, sessionID: string): IItemEventRouterResponse {
        return this.insuranceController.insure(pmcData, body, sessionID);
    }

    public async onUpdate(secondsSinceLastRun: number): Promise<boolean> {
        // People edit the config value to be 0 and break it, force value to no lower than 1
        if (secondsSinceLastRun > Math.max(this.insuranceConfig.runIntervalSeconds, 1)) {
            this.insuranceController.processReturn();
            return true;
        }
        return false;
    }

    public getRoute(): string {
        return "spt-insurance";
    }
}
