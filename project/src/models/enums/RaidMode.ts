export const RaidMode = {
    ONLINE: "Online",
    LOCAL: "Local",
    COOP: "Coop",
} as const;

export type RaidMode = (typeof RaidMode)[keyof typeof RaidMode];
