export const CircleRewardType = {
    RANDOM: 0,
    HIDEOUT_TASK: 1,
} as const;

export type CircleRewardType = (typeof CircleRewardType)[keyof typeof CircleRewardType];
