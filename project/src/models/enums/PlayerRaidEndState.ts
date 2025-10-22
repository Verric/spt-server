export const PlayerRaidEndState = {
    SURVIVED: "survived",
    LEFT: "left",
    RUNNER: "runner",
    MISSING_IN_ACTION: "missinginaction",
    KILLED: "killed",
} as const;
export type PlayerRaidEndState = (typeof PlayerRaidEndState)[keyof typeof PlayerRaidEndState];
