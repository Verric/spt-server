export const QteResultType = {
    NONE: "None",
    EXIT: "Exit",
} as const;

export type QteResultType = (typeof QteResultType)[keyof typeof QteResultType];
