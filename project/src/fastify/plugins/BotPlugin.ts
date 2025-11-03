import { FastifyPluginAsync } from "fastify";
import { container } from "tsyringe";
import { BotHandler } from "../handlers/BotHandler";

export const botPlugin: FastifyPluginAsync = async (fastify, _opts) => {
    const handlers = container.resolve(BotHandler);
    handlers.registerRoutes(fastify);
};
