export const RainType = {
    NO_RAIN: "NoRain",
    DRIZZLING: "Drizzling",
    RAIN: "Rain",
    HEAVY: "Heavy",
    SHOWER: "Shower",
} as const;

export type RainType = (typeof RainType)[keyof typeof RainType];
