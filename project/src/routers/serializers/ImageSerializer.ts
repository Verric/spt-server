import { IncomingMessage, ServerResponse } from "node:http";
import { Serializer } from "@spt/di/Serializer";
import { ImageRouter } from "@spt/routers/ImageRouter";
import { inject, injectable } from "tsyringe";

@injectable()
export class ImageSerializer extends Serializer {
    protected imageRouter: ImageRouter;
    constructor(@inject("ImageRouter") imageRouter: ImageRouter) {
        super();
        this.imageRouter = imageRouter;
    }

    public override async serialize(sessionID: string, req: IncomingMessage, resp: ServerResponse): Promise<void> {
        await this.imageRouter.sendImage(sessionID, req, resp);
    }

    public override canHandle(route: string): boolean {
        return route === "IMAGE";
    }
}
