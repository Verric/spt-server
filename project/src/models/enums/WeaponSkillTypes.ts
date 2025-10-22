export const WeaponSkillTypes = {
    PISTOL: "Pistol",
    REVOLVER: "Revolver",
    SMG: "SMG",
    ASSAULT: "Assault",
    SHOTGUN: "Shotgun",
    SNIPER: "Sniper",
    LMG: "LMG",
    HMG: "HMG",
    DMR: "DMR",
    LAUNCHER: "Launcher",
    ATTACHED_LAUNCHER: "AttachedLauncher",
    MELEE: "Melee",
} as const;
export type WeaponSkillTypes = (typeof WeaponSkillTypes)[keyof typeof WeaponSkillTypes];
