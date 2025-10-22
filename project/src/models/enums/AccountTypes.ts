export const AccountTypes = {
    SPT_DEVELOPER: "spt developer",
} as const;

export type AccountTypes = (typeof AccountTypes)[keyof typeof AccountTypes];
