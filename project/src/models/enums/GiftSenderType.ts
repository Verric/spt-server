export const GiftSenderType = {
    SYSTEM: "System",
    TRADER: "Trader",
    USER: "User",
} as const;

export type GiftSenderType = (typeof GiftSenderType)[keyof typeof GiftSenderType];
