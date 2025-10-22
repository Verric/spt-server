import { OnLoad } from "@spt/di/OnLoad";
import { OnUpdate } from "@spt/di/OnUpdate";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { ICoreConfig } from "@spt/models/spt/config/ICoreConfig";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SaveServer } from "@spt/servers/SaveServer";
import { BackupService } from "@spt/services/BackupService";
import { inject, injectable } from "tsyringe";

@injectable()
export class SaveCallbacks implements OnLoad, OnUpdate {
    protected coreConfig: ICoreConfig;
    protected saveServer: SaveServer;
    protected configServer: ConfigServer;
    protected backupService: BackupService;

    constructor(
        @inject("SaveServer") saveServer: SaveServer,
        @inject("ConfigServer") configServer: ConfigServer,
        @inject("BackupService") backupService: BackupService,
    ) {
        this.saveServer = saveServer;
        this.configServer = configServer;
        this.backupService = backupService;
        this.coreConfig = this.configServer.getConfig(ConfigTypes.CORE);
    }

    public async onLoad(): Promise<void> {
        await this.backupService.init();
        await this.saveServer.load();
    }

    public getRoute(): string {
        return "spt-save";
    }

    public async onUpdate(secondsSinceLastRun: number): Promise<boolean> {
        // run every 15 seconds
        if (secondsSinceLastRun > this.coreConfig.profileSaveIntervalSeconds) {
            await this.saveServer.save();
            return true;
        }
        return false;
    }
}
