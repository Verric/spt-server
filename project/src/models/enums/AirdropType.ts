export const AirdropTypeEnum = {
    COMMON: "Common",
    SUPPLY: "Supply",
    MEDICAL: "Medical",
    WEAPON_ARMOR: "Weapon",
};
export type AirdropTypeEnum = (typeof AirdropTypeEnum)[keyof typeof AirdropTypeEnum];

export const SptAirdropTypeEnum = {
    COMMON: "mixed",
    SUPPLY: "barter",
    FOOD_MEDICAL: "foodMedical",
    WEAPON_ARMOR: "weaponArmor",
    RADAR: "radar",
};

export type SptAirdropTypeEnum = (typeof SptAirdropTypeEnum)[keyof typeof SptAirdropTypeEnum];
