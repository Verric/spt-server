export const TransitionType = {
    None: 0,
    Common: 1,
    Event: 2,
} as const;

export type TransitionType = (typeof TransitionType)[keyof typeof TransitionType];
