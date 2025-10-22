export const DogtagExchangeSide = {
    USEC: "Usec",
    BEAR: "Bear",
    ANY: "Any",
} as const;

export type DogtagExchangeSide = (typeof DogtagExchangeSide)[keyof typeof DogtagExchangeSide];
