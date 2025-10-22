export const QteEffectType = {
    FINISH_EFFECT: "finishEffect",
    SINGLE_SUCCESS_EFFECT: "singleSuccessEffect",
    SINGLE_FAIL_EFFECT: "singleFailEffect",
} as const;

export type QteEffectType = (typeof QteEffectType)[keyof typeof QteEffectType];
