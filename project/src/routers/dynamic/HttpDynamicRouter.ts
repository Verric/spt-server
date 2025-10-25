import { DynamicRouter } from "@spt/di/Router";
import { ImageRouter } from "@spt/routers/ImageRouter";
import { inject, injectable } from "tsyringe";

@injectable()
export class HttpDynamicRouter extends DynamicRouter {
    constructor(@inject("ImageRouter") imageRouter: ImageRouter) {
        super([
            { url: ".jpg", action: async (): Promise<string> => imageRouter.getImage() },
            { url: ".png", action: async (): Promise<string> => imageRouter.getImage() },
            { url: ".ico", action: async (): Promise<string> => imageRouter.getImage() },
        ]);
    }
}
