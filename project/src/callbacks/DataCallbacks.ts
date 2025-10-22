import { HideoutController } from "@spt/controllers/HideoutController";
import { TraderController } from "@spt/controllers/TraderController";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { IGlobals } from "@spt/models/eft/common/IGlobals";
import { ICustomizationItem } from "@spt/models/eft/common/tables/ICustomizationItem";
import { IHandbookBase } from "@spt/models/eft/common/tables/IHandbookBase";
import { IGetItemPricesResponse } from "@spt/models/eft/game/IGetItemPricesResponse";
import { IHideoutArea } from "@spt/models/eft/hideout/IHideoutArea";
import { IHideoutProductionData } from "@spt/models/eft/hideout/IHideoutProduction";
import { IHideoutSettingsBase } from "@spt/models/eft/hideout/IHideoutSettingsBase";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { ISettingsBase } from "@spt/models/spt/server/ISettingsBase";
import { DatabaseService } from "@spt/services/DatabaseService";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { inject, injectable } from "tsyringe";

/**
 * Handle client requests
 */
@injectable()
export class DataCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected timeUtil: TimeUtil;
    protected traderHelper: TraderHelper;
    protected databaseService: DatabaseService;
    protected traderController: TraderController;
    protected hideoutController: HideoutController;

    constructor(
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("TimeUtil") timeUtil: TimeUtil,
        @inject("TraderHelper") traderHelper: TraderHelper,
        @inject("DatabaseService") databaseService: DatabaseService,
        @inject("TraderController") traderController: TraderController,
        @inject("HideoutController") hideoutController: HideoutController,
    ) {
        this.httpResponse = httpResponse;
        this.timeUtil = timeUtil;
        this.traderHelper = traderHelper;
        this.databaseService = databaseService;
        this.traderController = traderController;
        this.hideoutController = hideoutController;
    }

    /**
     * Handle client/settings
     * @returns ISettingsBase
     */
    public getSettings(
        _url: string,
        _info: IEmptyRequestData,
        _sessionID: string,
    ): IGetBodyResponseData<ISettingsBase> {
        return this.httpResponse.getBody(this.databaseService.getSettings());
    }

    /**
     * Handle client/globals
     * @returns IGlobals
     */
    public getGlobals(_url: string, _info: IEmptyRequestData, _sessionID: string): IGetBodyResponseData<IGlobals> {
        const _globals = this.databaseService.getGlobals();

        return this.httpResponse.getBody(this.databaseService.getGlobals());
    }

    /**
     * Handle client/items
     * @returns string
     */
    public getTemplateItems(_url: string, _info: IEmptyRequestData, _sessionID: string): string {
        return this.httpResponse.getUnclearedBody(this.databaseService.getItems());
    }

    /**
     * Handle client/handbook/templates
     * @returns IHandbookBase
     */
    public getTemplateHandbook(
        _url: string,
        _info: IEmptyRequestData,
        _sessionID: string,
    ): IGetBodyResponseData<IHandbookBase> {
        return this.httpResponse.getBody(this.databaseService.getHandbook());
    }

    /**
     * Handle client/customization
     * @returns Record<string, ICustomizationItem
     */
    public getTemplateSuits(
        _url: string,
        _info: IEmptyRequestData,
        _sessionID: string,
    ): IGetBodyResponseData<Record<string, ICustomizationItem>> {
        return this.httpResponse.getBody(this.databaseService.getTemplates().customization);
    }

    /**
     * Handle client/account/customization
     * @returns string[]
     */
    public getTemplateCharacter(
        _url: string,
        _info: IEmptyRequestData,
        _sessionID: string,
    ): IGetBodyResponseData<string[]> {
        return this.httpResponse.getBody(this.databaseService.getTemplates().character);
    }

    /**
     * Handle client/hideout/settings
     * @returns IHideoutSettingsBase
     */
    public getHideoutSettings(
        _url: string,
        _info: IEmptyRequestData,
        _sessionID: string,
    ): IGetBodyResponseData<IHideoutSettingsBase> {
        return this.httpResponse.getBody(this.databaseService.getHideout().settings);
    }

    public getHideoutAreas(
        _url: string,
        _info: IEmptyRequestData,
        _sessionID: string,
    ): IGetBodyResponseData<IHideoutArea[]> {
        return this.httpResponse.getBody(this.databaseService.getHideout().areas);
    }

    public getHideoutProduction(
        _url: string,
        _info: IEmptyRequestData,
        _sessionID: string,
    ): IGetBodyResponseData<IHideoutProductionData> {
        return this.httpResponse.getBody(this.databaseService.getHideout().production);
    }

    /**
     * Handle client/languages
     */
    public getLocalesLanguages(
        _url: string,
        _info: IEmptyRequestData,
        _sessionID: string,
    ): IGetBodyResponseData<Record<string, string>> {
        return this.httpResponse.getBody(this.databaseService.getLocales().languages);
    }

    /**
     * Handle client/menu/locale
     */
    public getLocalesMenu(url: string, _info: IEmptyRequestData, _sessionID: string): IGetBodyResponseData<string> {
        const localeId = url.replace("/client/menu/locale/", "");
        const locales = this.databaseService.getLocales();
        let result = locales.menu[localeId];

        if (result === undefined) {
            result = locales.menu.en;
        }

        if (result === undefined) throw new Error(`Unable to determine locale for request with '${localeId}'`);

        return this.httpResponse.getBody(result);
    }

    /**
     * Handle client/locale
     */
    public getLocalesGlobal(url: string, _info: IEmptyRequestData, _sessionID: string): string {
        const localeId = url.replace("/client/locale/", "");
        const locales = this.databaseService.getLocales();
        let result = locales.global[localeId];

        if (result === undefined) {
            result = locales.global.en;
        }

        return this.httpResponse.getUnclearedBody(result);
    }

    /**
     * Handle client/hideout/qte/list
     */
    public getQteList(_url: string, _info: IEmptyRequestData, sessionID: string): string {
        return this.httpResponse.getUnclearedBody(this.hideoutController.getQteList(sessionID));
    }

    /**
     * Handle client/items/prices/
     * Called when viewing a traders assorts
     */
    public getItemPrices(
        url: string,
        _info: IEmptyRequestData,
        sessionID: string,
    ): IGetBodyResponseData<IGetItemPricesResponse> {
        const traderId = url.replace("/client/items/prices/", "");

        return this.httpResponse.getBody(this.traderController.getItemPrices(sessionID, traderId));
    }
}
