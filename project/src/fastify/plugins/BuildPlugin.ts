import { FastifyPluginAsync } from "fastify";
import { container } from "tsyringe";
import { BuildHandler } from "../handlers/BuildHandler";

export const buildPlugin: FastifyPluginAsync = async (fastify, _opts) => {
    const handlers = container.resolve(BuildHandler);
    handlers.registerRoutes(fastify);
};
