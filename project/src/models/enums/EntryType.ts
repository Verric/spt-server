export const EntryType = {
    LOCAL: "LOCAL",
    DEBUG: "DEBUG",
    RELEASE: "RELEASE",
    BLEEDING_EDGE: "BLEEDING_EDGE",
    BLEEDING_EDGE_MODS: "BLEEDING_EDGE_MODS",
};
export type EntryType = (typeof EntryType)[keyof typeof EntryType];
