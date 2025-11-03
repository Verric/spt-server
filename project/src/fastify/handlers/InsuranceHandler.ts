import { InsuranceController } from "@spt/controllers/InsuranceController";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IGetInsuranceCostRequestData } from "@spt/models/eft/insurance/IGetInsuranceCostRequestData";
import { IInsureRequestData } from "@spt/models/eft/insurance/IInsureRequestData";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { FastifyInstance, FastifyRequest } from "fastify";
import { inject } from "tsyringe";

export class InsuranceHandler {
    private insuranceController: InsuranceController;
    private httpResponse: HttpResponseUtil;

    constructor(
        @inject("InsuranceController") insuranceController: InsuranceController,
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil
    ) {
        this.insuranceController = insuranceController;
        this.httpResponse = httpResponse;
    }

    getInsuranceCost(req: FastifyRequest<{ Body: IGetInsuranceCostRequestData }>) {
        return this.httpResponse.getBody(this.insuranceController.cost(req.body, req.sessionId));
    }

    // Item event callback — left as-is
    insure(pmcData: IPmcData, body: IInsureRequestData, sessionID: string) {
        return this.insuranceController.insure(pmcData, body, sessionID);
    }

    registerRoutes(fastify: FastifyInstance) {
        fastify.get("/client/insurance/items/list/cost", this.getInsuranceCost.bind(this));
    }
}
