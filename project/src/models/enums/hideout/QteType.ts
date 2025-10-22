export const QteType = { SHRINKING_CIRCLE: 0 } as const;

export type QteType = (typeof QteType)[keyof typeof QteType];
