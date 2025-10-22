export const WindDirection = {
    EAST: 1,
    NORTH: 2,
    WEST: 3,
    SOUTH: 4,
    SE: 5,
    SW: 6,
    NW: 7,
    NE: 8,
} as const;

export type WindDirection = (typeof WindDirection)[keyof typeof WindDirection];
