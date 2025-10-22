export const ESessionMode = {
    REGULAR: "regular",
    PVE: "pve",
} as const;
export type ESessionMode = (typeof ESessionMode)[keyof typeof ESessionMode];

export interface IGameModeResponse {
    gameMode: ESessionMode;
    backendUrl: string;
}
