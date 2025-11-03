import { HideoutController } from "@spt/controllers/HideoutController";
import { TraderController } from "@spt/controllers/TraderController";
import { DatabaseService } from "@spt/services/DatabaseService";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { FastifyInstance, FastifyRequest } from "fastify";
import { inject } from "tsyringe";

export class DataHandler {
    private httpResponse: HttpResponseUtil;
    private databaseService: DatabaseService;
    private traderController: TraderController;
    private hideoutController: HideoutController;

    constructor(
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("DatabaseService") databaseService: DatabaseService,
        @inject("TraderController") traderController: TraderController,
        @inject("HideoutController") hideoutController: HideoutController
    ) {
        this.httpResponse = httpResponse;
        this.databaseService = databaseService;
        this.traderController = traderController;
        this.hideoutController = hideoutController;
    }

    getSettings() {
        return this.httpResponse.getBody(this.databaseService.getSettings());
    }

    getGlobals() {
        return this.httpResponse.getBody(this.databaseService.getGlobals());
    }

    getTemplateItems() {
        return this.httpResponse.getUnclearedBody(this.databaseService.getItems());
    }

    getTemplateHandbook() {
        return this.httpResponse.getBody(this.databaseService.getHandbook());
    }

    getTemplateSuits() {
        return this.httpResponse.getBody(this.databaseService.getTemplates().customization);
    }

    getTemplateCharacter() {
        return this.httpResponse.getBody(this.databaseService.getTemplates().character);
    }

    getHideoutSettings() {
        return this.httpResponse.getBody(this.databaseService.getHideout().settings);
    }

    getHideoutAreas() {
        return this.httpResponse.getBody(this.databaseService.getHideout().areas);
    }

    getHideoutProduction() {
        return this.httpResponse.getBody(this.databaseService.getHideout().production);
    }

    getLocalesLanguages() {
        return this.httpResponse.getBody(this.databaseService.getLocales().languages);
    }

    getLocalesMenu(req: FastifyRequest<{ Params: { localeId: string } }>) {
        const localeId = req.params.localeId;
        const locales = this.databaseService.getLocales();
        let result = locales.menu[localeId] ?? locales.menu.en;
        if (!result) throw new Error(`Unable to determine locale for request with '${localeId}'`);
        return this.httpResponse.getBody(result);
    }

    getLocalesGlobal(req: FastifyRequest<{ Params: { localeId: string } }>) {
        const localeId = req.params.localeId;
        const locales = this.databaseService.getLocales();
        let result = locales.global[localeId] ?? locales.global.en;
        return this.httpResponse.getUnclearedBody(result);
    }

    getQteList(req: FastifyRequest) {
        return this.httpResponse.getUnclearedBody(this.hideoutController.getQteList(req.sessionId));
    }

    getItemPrices(req: FastifyRequest<{ Params: { traderId: string } }>) {
        return this.httpResponse.getBody(this.traderController.getItemPrices(req.sessionId, req.params.traderId));
    }

    registerRoutes(fastify: FastifyInstance) {
        fastify.get("/client/settings", this.getSettings.bind(this));
        fastify.get("/client/globals", this.getGlobals.bind(this));
        fastify.get("/client/items", this.getTemplateItems.bind(this));
        fastify.get("/client/handbook/templates", this.getTemplateHandbook.bind(this));
        fastify.get("/client/customization", this.getTemplateSuits.bind(this));
        fastify.get("/client/account/customization", this.getTemplateCharacter.bind(this));
        fastify.get("/client/hideout/production/recipes", this.getHideoutProduction.bind(this));
        fastify.get("/client/hideout/settings", this.getHideoutSettings.bind(this));
        fastify.get("/client/hideout/areas", this.getHideoutAreas.bind(this));
        fastify.get("/client/languages", this.getLocalesLanguages.bind(this));
        fastify.get("/client/hideout/qte/list", this.getQteList.bind(this));
        fastify.get("/client/items/prices/:traderId", this.getItemPrices.bind(this));
        fastify.get("/client/menu/locale/:localeId", this.getLocalesMenu.bind(this));
        fastify.get("/client/locale/:localeId", this.getLocalesGlobal.bind(this));
    }
}
