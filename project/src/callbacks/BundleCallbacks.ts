import { BundleLoader } from "@spt/loaders/BundleLoader";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { IHttpConfig } from "@spt/models/spt/config/IHttpConfig";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { inject, injectable } from "tsyringe";

@injectable()
export class BundleCallbacks {
    protected httpConfig: IHttpConfig;
    protected httpResponse: HttpResponseUtil;
    protected bundleLoader: BundleLoader;
    protected configServer: ConfigServer;

    constructor(
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("BundleLoader") bundleLoader: BundleLoader,
        @inject("ConfigServer") configServer: ConfigServer
    ) {
        this.configServer = configServer;
        this.httpConfig = this.configServer.getConfig(ConfigTypes.HTTP);
        this.httpResponse = httpResponse;
        this.bundleLoader = bundleLoader;
    }

    /**
     * Handle singleplayer/bundles
     */
    public getBundles(_url: string, _info: any, _sessionID: string): string {
        return this.httpResponse.noBody(this.bundleLoader.getBundles());
    }

    public getBundle(_url: string, _info: any, _sessionID: string): string {
        return "BUNDLE";
    }
}
