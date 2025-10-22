export const PlayersSpawnPlace = {
    SAME_PLACE: "SamePlace",
    DIFFERENT_PLACES: "DifferentPlaces",
    AT_THE_ENDS_OF_THE_MAP: "AtTheEndsOfTheMap",
} as const;
export type PlayersSpawnPlace = (typeof PlayersSpawnPlace)[keyof typeof PlayersSpawnPlace];
