import { FenceBaseAssortGenerator } from "@spt/generators/FenceBaseAssortGenerator";
import { PaymentHelper } from "@spt/helpers/PaymentHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { TraderAssortHelper } from "@spt/helpers/TraderAssortHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { ITraderAssort, ITraderBase } from "@spt/models/eft/common/tables/ITrader";
import { IGetItemPricesResponse } from "@spt/models/eft/game/IGetItemPricesResponse";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { Money } from "@spt/models/enums/Money";
import { Traders } from "@spt/models/enums/Traders";
import { ITraderConfig } from "@spt/models/spt/config/ITraderConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { FenceService } from "@spt/services/FenceService";
import { RagfairPriceService } from "@spt/services/RagfairPriceService";
import { TraderAssortService } from "@spt/services/TraderAssortService";
import { TraderPurchasePersisterService } from "@spt/services/TraderPurchasePersisterService";
import type { ICloner } from "@spt/utils/cloners/ICloner";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { inject, injectable } from "tsyringe";

@injectable()
export class TraderController {
    private traderConfig: ITraderConfig;
    private timeUtil: TimeUtil;
    private databaseService: DatabaseService;
    private traderAssortHelper: TraderAssortHelper;
    private profileHelper: ProfileHelper;
    private traderHelper: TraderHelper;
    private paymentHelper: PaymentHelper;
    private traderAssortService: TraderAssortService;
    private ragfairPriceService: RagfairPriceService;
    private traderPurchasePersisterService: TraderPurchasePersisterService;
    private fenceService: FenceService;
    private fenceBaseAssortGenerator: FenceBaseAssortGenerator;
    private configServer: ConfigServer;
    private cloner: ICloner;

    constructor(
        @inject("TimeUtil") timeUtil: TimeUtil,
        @inject("DatabaseService") databaseService: DatabaseService,
        @inject("TraderAssortHelper") traderAssortHelper: TraderAssortHelper,
        @inject("ProfileHelper") profileHelper: ProfileHelper,
        @inject("TraderHelper") traderHelper: TraderHelper,
        @inject("PaymentHelper") paymentHelper: PaymentHelper,
        @inject("TraderAssortService") traderAssortService: TraderAssortService,
        @inject("RagfairPriceService") ragfairPriceService: RagfairPriceService,
        @inject("TraderPurchasePersisterService")
        traderPurchasePersisterService: TraderPurchasePersisterService,
        @inject("FenceService") fenceService: FenceService,
        @inject("FenceBaseAssortGenerator") fenceBaseAssortGenerator: FenceBaseAssortGenerator,
        @inject("ConfigServer") configServer: ConfigServer,
        @inject("PrimaryCloner") cloner: ICloner
    ) {
        this.timeUtil = timeUtil;
        this.databaseService = databaseService;
        this.traderAssortHelper = traderAssortHelper;
        this.profileHelper = profileHelper;
        this.traderHelper = traderHelper;
        this.paymentHelper = paymentHelper;
        this.traderAssortService = traderAssortService;
        this.ragfairPriceService = ragfairPriceService;
        this.traderPurchasePersisterService = traderPurchasePersisterService;
        this.fenceService = fenceService;
        this.fenceBaseAssortGenerator = fenceBaseAssortGenerator;
        this.configServer = configServer;
        this.cloner = cloner;
        this.traderConfig = this.configServer.getConfig(ConfigTypes.TRADER);
    }

    /**
     * Runs when onLoad event is fired
     * Iterate over traders, ensure a pristine copy of their assorts is stored in traderAssortService
     * Store timestamp of next assort refresh in nextResupply property of traders .base object
     */
    public load(): void {
        const nextHourTimestamp = this.timeUtil.getTimestampOfNextHour();
        const traderResetStartsWithServer = this.traderConfig.tradersResetFromServerStart;

        const traders = this.databaseService.getTraders();
        for (const traderId in traders) {
            if (traderId === "ragfair" || traderId === Traders.LIGHTHOUSEKEEPER) {
                continue;
            }

            if (traderId === Traders.FENCE) {
                this.fenceBaseAssortGenerator.generateFenceBaseAssorts();
                this.fenceService.generateFenceAssorts();
                continue;
            }

            const trader = traders[traderId];

            // Adjust price by traderPriceMultipler config property
            if (this.traderConfig.traderPriceMultipler !== 1) {
                for (const barterItem of Object.values(trader.assort.barter_scheme)) {
                    const barterSchemeItem = barterItem[0][0];

                    if (barterSchemeItem && this.paymentHelper.isMoneyTpl(barterSchemeItem._tpl)) {
                        barterSchemeItem.count += +(
                            barterSchemeItem.count * this.traderConfig.traderPriceMultipler
                        ).toFixed(2);
                    }
                }
            }

            // Create dict of pristine trader assorts on server start
            if (!this.traderAssortService.getPristineTraderAssort(traderId)) {
                const assortsClone = this.cloner.clone(trader.assort);
                this.traderAssortService.setPristineTraderAssort(traderId, assortsClone);
            }

            this.traderPurchasePersisterService.removeStalePurchasesFromProfiles(traderId);

            // Set to next hour on clock or current time + 60 mins
            trader.base.nextResupply = traderResetStartsWithServer
                ? this.traderHelper.getNextUpdateTimestamp(trader.base._id)
                : nextHourTimestamp;
            traders[trader.base._id].base = trader.base;
        }
    }

    /**
     * Runs when onUpdate is fired
     * If current time is > nextResupply(expire) time of trader, refresh traders assorts and
     * Fence is handled slightly differently
     * @returns has run
     */
    public update(): boolean {
        for (const traderId in this.databaseService.getTables().traders) {
            if (traderId === "ragfair" || traderId === Traders.LIGHTHOUSEKEEPER) {
                continue;
            }

            if (traderId === Traders.FENCE) {
                if (this.fenceService.needsPartialRefresh()) {
                    this.fenceService.performPartialRefresh();
                }

                continue;
            }

            // Trader needs to be refreshed
            const trader = this.databaseService.getTrader(traderId);
            if (this.traderAssortHelper.traderAssortsHaveExpired(traderId)) {
                this.traderAssortHelper.resetExpiredTrader(trader);

                // Reset purchase data per trader as they have independent reset times
                this.traderPurchasePersisterService.resetTraderPurchasesStoredInProfile(trader.base._id);
            }
        }

        return true;
    }

    /**
     * Handle client/trading/api/traderSettings
     * Return an array of all traders
     * @param sessionID Session id
     * @returns array if ITraderBase objects
     */
    public getAllTraders(sessionID: string): ITraderBase[] {
        const traders: ITraderBase[] = [];
        const pmcData = this.profileHelper.getPmcProfile(sessionID);
        for (const traderID in this.databaseService.getTables().traders) {
            if (this.databaseService.getTables().traders[traderID].base._id === "ragfair") {
                continue;
            }

            traders.push(this.traderHelper.getTrader(traderID, sessionID));

            if (pmcData.Info) {
                this.traderHelper.lvlUp(traderID, pmcData);
            }
        }

        return traders.sort((a, b) => this.sortByTraderId(a, b));
    }

    /**
     * Order traders by their traderId (Ttid)
     * @param traderA First trader to compare
     * @param traderB Second trader to compare
     * @returns 1,-1 or 0
     */
    protected sortByTraderId(traderA: ITraderBase, traderB: ITraderBase): number {
        if (traderA._id > traderB._id) {
            return 1;
        }

        if (traderA._id < traderB._id) {
            return -1;
        }

        return 0;
    }

    /** Handle client/trading/api/getTrader */
    public getTrader(sessionID: string, traderID: string): ITraderBase {
        return this.traderHelper.getTrader(sessionID, traderID);
    }

    /** Handle client/trading/api/getTraderAssort */
    public getAssort(sessionId: string, traderId: string): ITraderAssort {
        return this.traderAssortHelper.getAssort(sessionId, traderId);
    }

    /** Handle client/items/prices/TRADERID */
    public getItemPrices(_sessionId: string, traderId: string): IGetItemPricesResponse {
        const handbookPrices = this.ragfairPriceService.getAllStaticPrices();
        const handbookPricesClone = this.cloner.clone(handbookPrices);

        return {
            supplyNextTime: this.traderHelper.getNextUpdateTimestamp(traderId),
            prices: handbookPricesClone,
            currencyCourses: {
                "5449016a4bdc2d6f028b456f": handbookPrices[Money.ROUBLES],
                "569668774bdc2da2298b4568": handbookPrices[Money.EUROS],
                "5696686a4bdc2da3298b456a": handbookPrices[Money.DOLLARS],
            },
        };
    }
}
