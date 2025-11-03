import { FastifyPluginAsync } from "fastify";
import { container } from "tsyringe";
import { CustomizationHandler } from "../handlers/CustimizationHandler";

export const customizationPlugin: FastifyPluginAsync = async (fastify, _opts) => {
    const handlers = container.resolve(CustomizationHandler);
    handlers.registerRoutes(fastify);
};
