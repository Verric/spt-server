import { NoteCallbacks } from "@spt/callbacks/NoteCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "@spt/di/Router";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { INoteActionData } from "@spt/models/eft/notes/INoteActionData";
import { inject, injectable } from "tsyringe";

@injectable()
export class NoteItemEventRouter extends ItemEventRouterDefinition {
    protected noteCallbacks: NoteCallbacks;
    constructor(
        @inject("NoteCallbacks") noteCallbacks: NoteCallbacks // TODO: delay required
    ) {
        super();
        this.noteCallbacks = noteCallbacks;
    }

    public override getHandledRoutes(): HandledRoute[] {
        return [
            { route: "AddNote", dynamic: false },
            { route: "EditNote", dynamic: false },
            { route: "DeleteNote", dynamic: false },
        ];
    }

    public override async handleItemEvent(
        url: "AddNote" | "EditNote" | "DeleteNote",
        pmcData: IPmcData,
        body: INoteActionData,
        sessionID: string
    ): Promise<IItemEventRouterResponse> {
        switch (url) {
            case "AddNote":
                return this.noteCallbacks.addNote(pmcData, body, sessionID);
            case "EditNote":
                return this.noteCallbacks.editNote(pmcData, body, sessionID);
            case "DeleteNote":
                return this.noteCallbacks.deleteNote(pmcData, body, sessionID);
        }
    }
}
