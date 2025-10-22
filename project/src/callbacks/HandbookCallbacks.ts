import { HandbookController } from "@spt/controllers/HandbookController";
import { OnLoad } from "@spt/di/OnLoad";
import { inject, injectable } from "tsyringe";

@injectable()
export class HandbookCallbacks implements OnLoad {
    protected handbookController: HandbookController;

    constructor(@inject("HandbookController") handbookController: HandbookController) {
        this.handbookController = handbookController;
    }

    public async onLoad(): Promise<void> {
        this.handbookController.load();
    }

    public getRoute(): string {
        return "spt-handbook";
    }
}
