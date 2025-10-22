export const QteRewardType = {
    SKILL: "Skill",
    HEALTH_EFFECT: "HealthEffect",
    MUSCLE_PAIN: "MusclePain",
    GYM_ARM_TRAUMA: "GymArmTrauma",
} as const;

export type QteRewardType = (typeof QteRewardType)[keyof typeof QteRewardType];
