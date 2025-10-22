export const FleaOfferType = {
    SINGLE: 0,
    MULTI: 1,
    PACK: 2,
    UNKNOWN: 3,
} as const;

export type FleaOfferType = (typeof FleaOfferType)[keyof typeof FleaOfferType];
