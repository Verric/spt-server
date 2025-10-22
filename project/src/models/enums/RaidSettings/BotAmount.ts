export const BotAmount = {
    AS_ONLINE: "AsOnline",
    NO_BOTS: "NoBots",
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "High",
    HORDE: "Horde",
} as const;
export type BotAmount = (typeof BotAmount)[keyof typeof BotAmount];
