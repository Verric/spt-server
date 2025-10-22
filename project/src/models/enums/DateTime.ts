export const DateTime = {
    CURR: "CURR",
    PAST: "PAST",
} as const;
export type DateTime = (typeof DateTime)[keyof typeof DateTime];
