export const BotDifficulty = {
    AS_ONLINE: "AsOnline",
    EASY: "Easy",
    MEDIUM: "Medium",
    HARD: "Hard",
    IMPOSSIBLE: "Impossible",
    RANDOM: "Random",
} as const;
export type BotDifficulty = (typeof BotDifficulty)[keyof typeof BotDifficulty];
