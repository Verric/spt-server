export const RequirementType = {
    AREA: "Area",
    ITEM: "Item",
    TRADER_UNLOCK: "TraderUnlock",
    TRADER_LOYALTY: "TraderLoyalty",
    SKILL: "Skill",
    RESOURCE: "Resource",
    TOOL: "Tool",
    QUEST_COMPLETE: "QuestComplete",
    HEALTH: "Health",
    BODY_PART_BUFF: "BodyPartBuff",
} as const;

export type QteType = (typeof RequirementType)[keyof typeof RequirementType];
