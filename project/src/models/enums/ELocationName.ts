export const ELocationName = {
    FACTORY_DAY: "factory4_day",
    FACTORY_NIGHT: "factory4_night",
    BIGMAP: "bigmap",
    WOODS: "Woods",
    SHORELINE: "Shoreline",
    SANDBOX: "Sandbox",
    INTERCHANGE: "Interchange",
    LIGHTHOUSE: "Lighthouse",
    LABORATORY: "laboratory",
    RESERVE: "RezervBase",
    STREETS: "TarkovStreets",
    ANY: "any",
} as const;

export type ELocationName = (typeof ELocationName)[keyof typeof ELocationName];
