import { HandbookHelper } from "@spt/helpers/HandbookHelper";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { inject, injectable } from "tsyringe";

@injectable()
export class HandbookController {
    protected databaseServer: DatabaseServer;
    protected handbookHelper: HandbookHelper;

    constructor(
        @inject("DatabaseServer") databaseServer: DatabaseServer,
        @inject("HandbookHelper") handbookHelper: HandbookHelper,
    ) {
        this.databaseServer = databaseServer;
        this.handbookHelper = handbookHelper;
    }

    public load(): void {
        return;
    }
}
