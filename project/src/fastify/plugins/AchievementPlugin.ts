import fastify, { FastifyPluginAsync } from "fastify";
import { container } from "tsyringe";
import { AchievementHandler } from "../handlers/AchievementHandler";

export const achievementPlugin: FastifyPluginAsync = async (fastify, _opts) => {
    const handlers = container.resolve(AchievementHandler);
    handlers.registerRoutes(fastify);
    //fastify.register(handlers.registerRoutes, {prefix:})
};
