import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

// Tells TS that sessionID should exist on the FastifyRequest object
declare module "fastify" {
    interface FastifyRequest {
        sessionId: string;
    }
}

// This must be registered *AFTER* the the @fastify/cookies plugin in order to read request.cookies
const sessionPlugin: FastifyPluginAsync = async (fastify) => {
    fastify.addHook("onRequest", async (request, reply) => {
        const sessionId = request.cookies.PHPSESSID;

        // This will probs blow up the EFT client if we don't get a cookie
        if (!sessionId) {
            reply.code(401).send({ error: "No session" });
            return;
        }
        request.sessionId = sessionId;
    });
};

// Export wrapped in fastify-plugin to make it global
// Could potentially just get rid of this if all other routes/plugins register under this plugin
export default fp(sessionPlugin);
