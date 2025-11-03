import { FastifyPluginAsync } from "fastify";
import { container } from "tsyringe";
import { BundleHandler } from "../handlers/BundleHandler";

export const bundlePlugin: FastifyPluginAsync = async (fastify, _opts) => {
    const handlers = container.resolve(BundleHandler);
    handlers.registerRoutes(fastify);
};
