export const ProfileStatus = {
    FREE: "Free",
    MATCH_WAIT: "MatchWait",
    BUSY: "Busy",
    LEAVING: "Leaving",
    TRANSFER: "Transfer",
} as const;

export type ProfileStatus = (typeof ProfileStatus)[keyof typeof ProfileStatus];
