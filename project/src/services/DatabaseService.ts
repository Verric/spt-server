import { IGlobals } from "@spt/models/eft/common/IGlobals";
import { ILocation } from "@spt/models/eft/common/ILocation";
import { IAchievement } from "@spt/models/eft/common/tables/IAchievement";
import { ICustomizationItem } from "@spt/models/eft/common/tables/ICustomizationItem";
import { IHandbookBase } from "@spt/models/eft/common/tables/IHandbookBase";
import { ILocationServices } from "@spt/models/eft/common/tables/ILocationServices";
import { IMatch } from "@spt/models/eft/common/tables/IMatch";
import { IProfileTemplates } from "@spt/models/eft/common/tables/IProfileTemplate";
import { IQuest } from "@spt/models/eft/common/tables/IQuest";
import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { ITrader } from "@spt/models/eft/common/tables/ITrader";
import { IBots } from "@spt/models/spt/bots/IBots";
import { IHideout } from "@spt/models/spt/hideout/IHideout";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILocaleBase } from "@spt/models/spt/server/ILocaleBase";
import { ILocations } from "@spt/models/spt/server/ILocations";
import { IServerBase } from "@spt/models/spt/server/IServerBase";
import { ISettingsBase } from "@spt/models/spt/server/ISettingsBase";
import { ITemplates } from "@spt/models/spt/templates/ITemplates";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { LocalisationService } from "@spt/services/LocalisationService";
import { HashUtil } from "@spt/utils/HashUtil";
import { Timer } from "@spt/utils/Timer";
import { inject, injectable } from "tsyringe";

@injectable()
export class DatabaseService {
    protected isDataValid: boolean;
    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    protected localisationService: LocalisationService;
    protected hashUtil: HashUtil;

    constructor(
        @inject("PrimaryLogger") logger: ILogger,
        @inject("DatabaseServer") databaseServer: DatabaseServer,
        @inject("LocalisationService") localisationService: LocalisationService,
        @inject("HashUtil") hashUtil: HashUtil
    ) {
        this.isDataValid = false; //potentially broke someting, this was set to undefined before as its init value
        this.logger = logger;
        this.databaseServer = databaseServer;
        this.localisationService = localisationService;
        this.hashUtil = hashUtil;
    }

    /**
     * @returns assets/database/
     */
    public getTables(): IDatabaseTables {
        return this.databaseServer.getTables();
    }

    /**
     * @returns assets/database/bots/
     */
    public getBots(): IBots {
        const bots = this.databaseServer.getTables().bots;
        if (!bots) {
            throw new Error(this.localisationService.getText("database-data_at_path_missing"));
        }
        return bots;
    }

    /**
     * @returns assets/database/globals.json
     */
    public getGlobals(): IGlobals {
        const globals = this.databaseServer.getTables().globals;
        if (!globals) {
            throw new Error(
                this.localisationService.getText("database-data_at_path_missing", "assets/database/globals.json")
            );
        }

        return globals;
    }

    /**
     * @returns assets/database/hideout/
     */
    public getHideout(): IHideout {
        const hideout = this.databaseServer.getTables().hideout;
        if (!hideout) {
            throw new Error(
                this.localisationService.getText("database-data_at_path_missing", "assets/database/hideout")
            );
        }
        return hideout;
    }

    /**
     * @returns assets/database/locales/
     */
    public getLocales(): ILocaleBase {
        const locales = this.databaseServer.getTables().locales;
        if (!locales) {
            throw new Error(
                this.localisationService.getText("database-data_at_path_missing", "assets/database/locales")
            );
        }

        return locales;
    }

    /**
     * @returns assets/database/locations
     */
    public getLocations(): ILocations {
        const locations = this.databaseServer.getTables().locations;
        if (!locations) {
            throw new Error(
                this.localisationService.getText("database-data_at_path_missing", "assets/database/locales")
            );
        }

        return locations;
    }

    /**
     * Get specific location by its Id
     * @param locationId Desired location id
     * @returns assets/database/locations/
     */
    public getLocation(locationId: string): ILocation {
        const locations = this.getLocations();
        const desiredLocation = locations[locationId.toLowerCase()];
        if (!desiredLocation) {
            throw new Error(this.localisationService.getText("database-no_location_found_with_id", locationId));
        }

        return desiredLocation;
    }

    /**
     * @returns assets/database/match/
     */
    public getMatch(): IMatch {
        const match = this.databaseServer.getTables().match;
        if (!match) {
            throw new Error(
                this.localisationService.getText("database-data_at_path_missing", "assets/database/locales")
            );
        }

        return match;
    }

    /**
     * @returns assets/database/server.json
     */
    public getServer(): IServerBase {
        const server = this.databaseServer.getTables().server;
        if (!server) {
            throw new Error(
                this.localisationService.getText("database-data_at_path_missing", "assets/database/server.json")
            );
        }

        return server;
    }

    /**
     * @returns assets/database/settings.json
     */
    public getSettings(): ISettingsBase {
        const settings = this.databaseServer.getTables().settings;
        if (!settings) {
            throw new Error(
                this.localisationService.getText("database-data_at_path_missing", "assets/database/settings.json")
            );
        }

        return settings;
    }

    /**
     * @returns assets/database/templates/
     */
    public getTemplates(): ITemplates {
        const templates = this.databaseServer.getTables().templates;
        if (!templates) {
            throw new Error(
                this.localisationService.getText("database-data_at_path_missing", "assets/database/templates")
            );
        }

        return templates;
    }

    /**
     * @returns assets/database/templates/achievements.json
     */
    public getAchievements(): IAchievement[] {
        const achievements = this.databaseServer.getTables().templates?.achievements;
        if (!achievements) {
            throw new Error(
                this.localisationService.getText(
                    "database-data_at_path_missing",
                    "assets/database/templates/achievements.json"
                )
            );
        }

        return achievements;
    }

    /**
     * @returns assets/database/templates/customAchievements.json
     */
    public getCustomAchievements(): IAchievement[] {
        const customAchievements = this.databaseServer.getTables().templates?.customAchievements;
        if (!customAchievements) {
            throw new Error(
                this.localisationService.getText(
                    "database-data_at_path_missing",
                    "assets/database/templates/customAchievements.json"
                )
            );
        }

        return customAchievements;
    }

    /**
     * @returns assets/database/templates/customisation.json
     */
    public getCustomization(): Record<string, ICustomizationItem> {
        const customization = this.databaseServer.getTables().templates?.customization;
        if (!customization) {
            throw new Error(
                this.localisationService.getText(
                    "database-data_at_path_missing",
                    "assets/database/templates/customization.json"
                )
            );
        }

        return customization;
    }

    /**
     * @returns assets/database/templates/handbook.json
     */
    public getHandbook(): IHandbookBase {
        const handbook = this.databaseServer.getTables().templates?.handbook;
        if (!handbook) {
            throw new Error(
                this.localisationService.getText(
                    "database-data_at_path_missing",
                    "assets/database/templates/handbook.json"
                )
            );
        }
        return handbook;
    }

    /**
     * @returns assets/database/templates/items.json
     */
    public getItems(): Record<string, ITemplateItem> {
        const items = this.databaseServer.getTables().templates?.items;
        if (!items) {
            throw new Error(
                this.localisationService.getText(
                    "database-data_at_path_missing",
                    "assets/database/templates/items.json"
                )
            );
        }

        return items;
    }

    /**
     * @returns assets/database/templates/prices.json
     */
    public getPrices(): Record<string, number> {
        const prices = this.databaseServer.getTables().templates?.prices;
        if (!prices) {
            throw new Error(
                this.localisationService.getText(
                    "database-data_at_path_missing",
                    "assets/database/templates/prices.json"
                )
            );
        }

        return prices;
    }

    /**
     * @returns assets/database/templates/profiles.json
     */
    public getProfiles(): IProfileTemplates {
        const profiles = this.databaseServer.getTables().templates?.profiles;
        if (!profiles) {
            throw new Error(
                this.localisationService.getText(
                    "database-data_at_path_missing",
                    "assets/database/templates/profiles.json"
                )
            );
        }

        return profiles;
    }

    /**
     * @returns assets/database/templates/quests.json
     */
    public getQuests(): Record<string, IQuest> {
        const quests = this.databaseServer.getTables().templates?.quests;
        if (!quests) {
            throw new Error(
                this.localisationService.getText(
                    "database-data_at_path_missing",
                    "assets/database/templates/quests.json"
                )
            );
        }

        return quests;
    }

    /**
     * @returns assets/database/traders/
     */
    public getTraders(): Record<string, ITrader> {
        const traders = this.databaseServer.getTables().traders;
        if (!traders) {
            throw new Error(
                this.localisationService.getText("database-data_at_path_missing", "assets/database/traders")
            );
        }

        return traders;
    }

    /**
     * Get specific trader by their Id
     * @param traderId Desired trader id
     * @returns assets/database/traders/
     */
    public getTrader(traderId: string): ITrader {
        const traders = this.getTraders();
        const desiredTrader = traders[traderId];
        if (!desiredTrader) {
            throw new Error(this.localisationService.getText("database-no_trader_found_with_id", traderId));
        }

        return desiredTrader;
    }

    /**
     * @returns assets/database/locationServices/
     */
    public getLocationServices(): ILocationServices {
        const locationServices = this.databaseServer.getTables().templates?.locationServices;
        if (!locationServices) {
            throw new Error(
                this.localisationService.getText(
                    "database-data_at_path_missing",
                    "assets/database/locationServices.json"
                )
            );
        }

        return locationServices;
    }

    /**
     * Validates that the database doesn't contain invalid ID data
     */
    public validateDatabase(): void {
        const timer = new Timer();
        this.isDataValid =
            this.validateTable(this.getQuests(), "quest") &&
            this.validateTable(this.getTraders(), "trader") &&
            this.validateTable(this.getItems(), "item") &&
            this.validateTable(this.getCustomization(), "customization");

        if (!this.isDataValid) {
            this.logger.error(this.localisationService.getText("database-invalid_data"));
        }

        this.logger.debug(`Database ID validation took ${timer.getTime("ms")}ms`);
    }

    /**
     * Check if the database is valid
     * @returns True if the database contains valid data, false otherwise
     */
    public isDatabaseValid(): boolean {
        return this.isDataValid;
    }

    // PRIVATE
    /**
     * Validate that the given table only contains valid MongoIDs
     * @param table Table to validate for MongoIDs
     * @param tableType The type of table, used in output message
     * @returns True if the table only contains valid data
     */
    private validateTable(table: Record<string, any>, tableType: string): boolean {
        for (const tableId in table) {
            if (!this.hashUtil.isValidMongoId(tableId)) {
                this.logger.error(`Invalid ${tableType} ID: '${tableId}'`);
                return false;
            }
        }

        return true;
    }
}
