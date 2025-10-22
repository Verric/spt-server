import type { IncomingMessage, ServerResponse } from "node:http";

export abstract class Serializer {
    public abstract serialize(sessionID: string, req: IncomingMessage, resp: ServerResponse): Promise<void>;
    public abstract canHandle(something: string): boolean;
}
