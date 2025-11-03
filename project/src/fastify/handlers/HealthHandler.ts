import { HealthController } from "@spt/controllers/HealthController";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IHealthTreatmentRequestData } from "@spt/models/eft/health/IHealthTreatmentRequestData";
import { IOffraidEatRequestData } from "@spt/models/eft/health/IOffraidEatRequestData";
import { IOffraidHealRequestData } from "@spt/models/eft/health/IOffraidHealRequestData";
import { IWorkoutData } from "@spt/models/eft/health/IWorkoutData";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { FastifyInstance, FastifyRequest } from "fastify";
import { inject } from "tsyringe";

export class HealthHandler {
    private httpResponse: HttpResponseUtil;
    private profileHelper: ProfileHelper;
    private healthController: HealthController;

    constructor(
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("ProfileHelper") profileHelper: ProfileHelper,
        @inject("HealthController") healthController: HealthController
    ) {
        this.httpResponse = httpResponse;
        this.profileHelper = profileHelper;
        this.healthController = healthController;
    }

    handleWorkoutEffects(req: FastifyRequest<{ Body: IWorkoutData }>) {
        this.healthController.applyWorkoutChanges(
            this.profileHelper.getPmcProfile(req.sessionId)!,
            req.body,
            req.sessionId
        );
        return this.httpResponse.emptyResponse();
    }

    // Event routes (not registered here)
    offraidEat(data: IOffraidEatRequestData, pmcData: IPmcData, sessionId: string) {
        return this.healthController.offraidEat(pmcData, data, sessionId);
    }

    offraidHeal(data: IOffraidHealRequestData, pmcData: IPmcData, sessionId: string) {
        return this.healthController.offraidHeal(pmcData, data, sessionId);
    }

    healthTreatment(data: IHealthTreatmentRequestData, pmcData: IPmcData, sessionId: string) {
        return this.healthController.healthTreatment(pmcData, data, sessionId);
    }

    registerRoutes(fastify: FastifyInstance) {
        fastify.get("/client/hideout/workout", this.handleWorkoutEffects.bind(this));
    }
}
