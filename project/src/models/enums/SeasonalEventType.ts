export const SeasonalEventType = {
    NONE: "None",
    CHRISTMAS: "Christmas",
    HALLOWEEN: "Halloween",
    NEW_YEARS: "NewYears",
    PROMO: "Promo",
    APRIL_FOOLS: "AprilFools",
} as const;
export type SeasonalEventType = (typeof SeasonalEventType)[keyof typeof SeasonalEventType];
