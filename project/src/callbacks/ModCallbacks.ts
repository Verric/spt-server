import { OnLoad } from "@spt/di/OnLoad";
import { PostSptModLoader } from "@spt/loaders/PostSptModLoader";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { IHttpConfig } from "@spt/models/spt/config/IHttpConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ProgramStatics } from "@spt/ProgramStatics";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { LocalisationService } from "@spt/services/LocalisationService";
import { HttpFileUtil } from "@spt/utils/HttpFileUtil";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { inject, injectable } from "tsyringe";

@injectable()
export class ModCallbacks implements OnLoad {
    protected httpConfig: IHttpConfig;
    protected logger: ILogger;
    protected httpResponse: HttpResponseUtil;
    protected httpFileUtil: HttpFileUtil;
    protected postSptModLoader: PostSptModLoader;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;

    constructor(
        @inject("PrimaryLogger") logger: ILogger,
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("HttpFileUtil") httpFileUtil: HttpFileUtil,
        @inject("PostSptModLoader") postSptModLoader: PostSptModLoader,
        @inject("LocalisationService") localisationService: LocalisationService,
        @inject("ConfigServer") configServer: ConfigServer,
    ) {
        this.logger = logger;
        this.httpResponse = httpResponse;
        this.httpFileUtil = httpFileUtil;
        this.postSptModLoader = postSptModLoader;
        this.localisationService = localisationService;
        this.configServer = configServer;
        this.httpConfig = this.configServer.getConfig(ConfigTypes.HTTP);
    }

    public async onLoad(): Promise<void> {
        if (ProgramStatics.MODS) {
            await this.postSptModLoader.load();
        }
    }

    public getRoute(): string {
        return "spt-mods";
    }
}
