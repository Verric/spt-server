import { BundleLoader } from "@spt/loaders/BundleLoader";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { FastifyInstance } from "fastify";
import { inject } from "tsyringe";

export class BundleHandler {
    private httpResponse: HttpResponseUtil;
    private bundleLoader: BundleLoader;

    constructor(
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("BundleLoader") bundleLoader: BundleLoader
    ) {
        this.httpResponse = httpResponse;
        this.bundleLoader = bundleLoader;
    }
    getBundles() {
        return this.httpResponse.noBody(this.bundleLoader.getBundles());
    }

    getBundle() {
        return "BUNDLE";
    }

    registerRoutes(fastify: FastifyInstance) {
        fastify.get("/singleplayer/bundles", this.getBundles.bind(this));
    }
}
