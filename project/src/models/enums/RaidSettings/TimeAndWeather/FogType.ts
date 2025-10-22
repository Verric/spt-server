export const FogType = {
    NO_FOG: "NoFog",
    FAINT: "Faint",
    FOG: "Fog",
    HEAVY: "Heavy",
    CONTINUOUS: "Continuous",
} as const;

export type FogType = (typeof FogType)[keyof typeof FogType];
