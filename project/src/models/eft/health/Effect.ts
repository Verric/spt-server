export const Effect = {
    FRACTURE: "Fracture",
    LIGHT_BLEEDING: "LightBleeding",
    HEAVY_BLEEDING: "HeavyBleeding",
    MILD_MUSCLE_PAIN: "MildMusclePain",
    SEVERE_MUSCLE_PAIN: "SevereMusclePain",
} as const;

export type Effect = (typeof Effect)[keyof typeof Effect];
