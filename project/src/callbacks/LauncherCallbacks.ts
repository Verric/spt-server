import { LauncherController } from "@spt/controllers/LauncherController";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { IChangeRequestData } from "@spt/models/eft/launcher/IChangeRequestData";
import { ILoginRequestData } from "@spt/models/eft/launcher/ILoginRequestData";
import { IRegisterData } from "@spt/models/eft/launcher/IRegisterData";
import { IRemoveProfileData } from "@spt/models/eft/launcher/IRemoveProfileData";
import { SaveServer } from "@spt/servers/SaveServer";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { Watermark } from "@spt/utils/Watermark";
import { inject, injectable } from "tsyringe";

@injectable()
export class LauncherCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected launcherController: LauncherController;
    protected saveServer: SaveServer;
    protected watermark: Watermark;

    constructor(
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("LauncherController") launcherController: LauncherController,
        @inject("SaveServer") saveServer: SaveServer,
        @inject("Watermark") watermark: Watermark,
    ) {
        this.httpResponse = httpResponse;
        this.launcherController = launcherController;
        this.saveServer = saveServer;
        this.watermark = watermark;
    }

    public connect(): string {
        return this.httpResponse.noBody(this.launcherController.connect());
    }

    public login(_url: string, info: ILoginRequestData, _sessionID: string): string {
        const output = this.launcherController.login(info);
        return !output ? "FAILED" : output;
    }

    public async register(_url: string, info: IRegisterData, _sessionID: string): Promise<"FAILED" | "OK"> {
        const output = await this.launcherController.register(info);
        return !output ? "FAILED" : "OK";
    }

    public get(_url: string, info: ILoginRequestData, _sessionID: string): string {
        const output = this.launcherController.find(this.launcherController.login(info));
        return this.httpResponse.noBody(output);
    }

    public changeUsername(_url: string, info: IChangeRequestData, _sessionID: string): "FAILED" | "OK" {
        const output = this.launcherController.changeUsername(info);
        return !output ? "FAILED" : "OK";
    }

    public changePassword(_url: string, info: IChangeRequestData, _sessionID: string): "FAILED" | "OK" {
        const output = this.launcherController.changePassword(info);
        return !output ? "FAILED" : "OK";
    }

    public wipe(_url: string, info: IRegisterData, _sessionID: string): "FAILED" | "OK" {
        const output = this.launcherController.wipe(info);
        return !output ? "FAILED" : "OK";
    }

    public getServerVersion(): string {
        return this.httpResponse.noBody(this.watermark.getVersionTag());
    }

    public ping(_url: string, _info: IEmptyRequestData, _sessionID: string): string {
        return this.httpResponse.noBody("pong!");
    }

    public async removeProfile(_url: string, _info: IRemoveProfileData, sessionID: string): Promise<string> {
        return this.httpResponse.noBody(await this.saveServer.removeProfile(sessionID));
    }

    public getCompatibleTarkovVersion(): string {
        return this.httpResponse.noBody(this.launcherController.getCompatibleTarkovVersion());
    }

    public getLoadedServerMods(): string {
        return this.httpResponse.noBody(this.launcherController.getLoadedServerMods());
    }

    public getServerModsProfileUsed(_url: string, _info: IEmptyRequestData, sessionId: string): string {
        return this.httpResponse.noBody(this.launcherController.getServerModsProfileUsed(sessionId));
    }
}
