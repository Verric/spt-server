import { RagfairSort } from "@spt/models/enums/RagfairSort";

export interface ISearchRequestData {
    page: number;
    limit: number;
    sortType: RagfairSort;
    sortDirection: number;
    currency: number;
    priceFrom: number;
    priceTo: number;
    quantityFrom: number;
    quantityTo: number;
    conditionFrom: number;
    conditionTo: number;
    oneHourExpiration: boolean;
    removeBartering: boolean;
    offerOwnerType: OfferOwnerType;
    onlyFunctional: boolean;
    updateOfferCount: boolean;
    handbookId: string;
    linkedSearchId: string;
    neededSearchId: string;
    buildItems: Record<string, number>;
    buildCount: number;
    tm: number;
    reload: number;
}

export const OfferOwnerType = {
    ANYOWNERTYPE: 0,
    TRADEROWNERTYPE: 1,
    PLAYEROWNERTYPE: 2,
} as const;
export type OfferOwnerType = (typeof OfferOwnerType)[keyof typeof OfferOwnerType];
