export const EquipmentBuildType = {
    CUSTOM: 0,
    STANDARD: 1,
} as const;

export type EquipmentBuildType = (typeof EquipmentBuildType)[keyof typeof EquipmentBuildType];
