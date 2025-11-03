import { FastifyPluginAsync } from "fastify";
import { container } from "tsyringe";
import { ClientLogHandler } from "../handlers/ClientLogHandler";

export const clientLogPlugin: FastifyPluginAsync = async (fastify, _opts) => {
    const handlers = container.resolve(ClientLogHandler);
    handlers.registerRoutes(fastify);
};
