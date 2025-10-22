export const CloudinessType = {
    CLEAR: "Clear",
    PARTLY_CLOUDY: "PartlyCloudy",
    CLOUDY: "Cloudy",
    CLOUDY_WITH_GAPS: "CloudyWithGaps",
    HEAVY_CLOUD_COVER: "HeavyCloudCover",
    THUNDER_CLOUD: "Thundercloud",
} as const;

export type CloudinessType = (typeof CloudinessType)[keyof typeof CloudinessType];
