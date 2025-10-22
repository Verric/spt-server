export const BonusSkillType = {
    PHYSICAL: "Physical",
    COMBAT: "Combat",
    SPECIAL: "Special",
    PRACTICAL: "Practical",
    MENTAL: "Mental",
} as const;

export type BonusSkillType = (typeof BonusSkillType)[keyof typeof BonusSkillType];
