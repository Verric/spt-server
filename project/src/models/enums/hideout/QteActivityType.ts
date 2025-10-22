export const QteActivityType = {
    GYM: 0,
} as const;

export type QteActivityType = (typeof QteActivityType)[keyof typeof QteActivityType];
