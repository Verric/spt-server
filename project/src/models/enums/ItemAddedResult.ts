export const ItemAddedResult = {
    UNKNOWN: -1,
    SUCCESS: 1,
    NO_SPACE: 2,
    NO_CONTAINERS: 3,
    INCOMPATIBLE_ITEM: 4,
} as const;

export type ItemAddedResult = (typeof ItemAddedResult)[keyof typeof ItemAddedResult];
