import { FastifyPluginAsync } from "fastify";
import { container } from "tsyringe";
import { DataHandler } from "../handlers/DataHandler";

export const dataPlugin: FastifyPluginAsync = async (fastify, _opts) => {
    const handlers = container.resolve(DataHandler);
    handlers.registerRoutes(fastify);
};
