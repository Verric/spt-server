export const WindSpeed = {
    LIGHT: "Light",
    MODERATE: "Moderate",
    STRONG: "Strong",
    VERY_STRONG: "VeryStrong",
    HURRICANE: "Hurricane",
} as const;

export type WindSpeed = (typeof WindSpeed)[keyof typeof WindSpeed];
