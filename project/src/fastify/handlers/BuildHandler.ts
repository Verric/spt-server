import { BuildController } from "@spt/controllers/BuildController";
import { ISetMagazineRequest } from "@spt/models/eft/builds/ISetMagazineRequest";
import { IPresetBuildActionRequestData } from "@spt/models/eft/presetBuild/IPresetBuildActionRequestData";
import { IRemoveBuildRequestData } from "@spt/models/eft/presetBuild/IRemoveBuildRequestData";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { FastifyInstance, FastifyRequest } from "fastify";
import { inject } from "tsyringe";

export class BuildHandler {
    private httpResponse: HttpResponseUtil;
    private buildController: BuildController;
    constructor(
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("BuildController") buildController: BuildController
    ) {
        this.httpResponse = httpResponse;
        this.buildController = buildController;
    }

    getBuilds(req: FastifyRequest) {
        return this.httpResponse.getBody(this.buildController.getUserBuilds(req.sessionId));
    }
    createMagazineTemplate(req: FastifyRequest<{ Body: ISetMagazineRequest }>) {
        this.buildController.createMagazineTemplate(req.sessionId, req.body);
        return this.httpResponse.nullResponse();
    }
    setWeapon(req: FastifyRequest<{ Body: IPresetBuildActionRequestData }>) {
        this.buildController.saveWeaponBuild(req.sessionId, req.body);
        return this.httpResponse.nullResponse();
    }
    setEquipment(req: FastifyRequest<{ Body: IPresetBuildActionRequestData }>) {
        this.buildController.saveEquipmentBuild(req.sessionId, req.body);
        return this.httpResponse.nullResponse();
    }
    deleteBuild(req: FastifyRequest<{ Body: IRemoveBuildRequestData }>) {
        this.buildController.removeBuild(req.sessionId, req.body);
        return this.httpResponse.nullResponse();
    }
    registerRoutes(fastify: FastifyInstance) {
        fastify.get("/client/builds/list", this.getBuilds.bind(this));
        fastify.get("/client/builds/magazine/save", this.createMagazineTemplate.bind(this));
        fastify.get("/client/builds/weapon/save", this.setWeapon.bind(this));
        fastify.get("/client/builds/equipment/save", this.setEquipment.bind(this));
        fastify.get("/client/builds/delete", this.deleteBuild.bind(this));
    }
}
