export const ExitStatus = {
    SURVIVED: "Survived",
    KILLED: "Killed",
    LEFT: "Left",
    RUNNER: "Runner",
    MISSINGINACTION: "MissingInAction",
    TRANSIT: "Transit",
} as const;

export type ExitStatus = (typeof ExitStatus)[keyof typeof ExitStatus];
