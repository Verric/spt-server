import { PresetController } from "@spt/controllers/PresetController";
import { OnLoad } from "@spt/di/OnLoad";
import { inject, injectable } from "tsyringe";

@injectable()
export class PresetCallbacks implements OnLoad {
    protected presetController: PresetController;

    constructor(@inject("PresetController") presetController: PresetController) {
        this.presetController = presetController;
    }

    public async onLoad(): Promise<void> {
        this.presetController.initialize();
    }

    public getRoute(): string {
        return "spt-presets";
    }
}
