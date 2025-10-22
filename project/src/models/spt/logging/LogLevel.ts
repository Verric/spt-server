export const LogLevel = {
    ERROR: 0,
    WARN: 1,
    SUCCESS: 2,
    INFO: 3,
    CUSTOM: 4,
    DEBUG: 5,
} as const;

export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];
