export const RagfairSort = {
    ID: 0,
    BARTER: 2,
    RATING: 3,
    OFFER_TITLE: 4,
    PRICE: 5,
    EXPIRY: 6,
} as const;

export type RagfairSort = (typeof RagfairSort)[keyof typeof RagfairSort];
