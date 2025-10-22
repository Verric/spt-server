export const ModSpawn = {
    /** Chosen mod should be the tpl from the default weapon template */
    DEFAULT_MOD: 0,
    /** Normal behaviour */
    SPAWN: 1,
    /** Item should not be chosen */
    SKIP: 2,
} as const;

export type ModSpawn = (typeof ModSpawn)[keyof typeof ModSpawn];
