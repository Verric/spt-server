import { IBaseInteractionRequestData } from "@spt/models/eft/common/request/IBaseInteractionRequestData";

export interface IOffraidHealRequestData extends IBaseInteractionRequestData {
    Action: "Heal";
    item: string;
    part: BodyPart;
    count: number;
    time: number;
}

export const BodyPart = {
    HEAD: "Head",
    CHEST: "Chest",
    STOMACH: "Stomach",
    LEFT_ARM: "LeftArm",
    RIGHT_ARM: "RightArm",
    LEFT_LEG: "LeftLeg",
    RIGHT_LEG: "RightLeg",
    COMMON: "Common",
} as const;

export type BodyPart = (typeof BodyPart)[keyof typeof BodyPart];
