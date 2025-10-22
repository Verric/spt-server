export const LogTextColor = {
    BLACK: "black",
    RED: "red",
    GREEN: "green",
    YELLOW: "yellow",
    BLUE: "blue",
    MAGENTA: "magenta",
    CYAN: "cyan",
    WHITE: "white",
    GRAY: "gray",
} as const;

export type LogTextColor = (typeof LogTextColor)[keyof typeof LogTextColor];
