import { Warning } from "@spt/models/eft/itemEvent/IItemEventRouterBase";
import { IItemEventRouterRequest } from "@spt/models/eft/itemEvent/IItemEventRouterRequest";
import { BackendErrorCodes } from "@spt/models/enums/BackendErrorCodes";
import { ItemEventRouter } from "@spt/routers/ItemEventRouter";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { FastifyInstance, FastifyRequest } from "fastify";
import { inject } from "tsyringe";

export class ItemEventHandler {
    private httpResponse: HttpResponseUtil;
    private itemEventRouter: ItemEventRouter;

    constructor(
        @inject("HttpResponseUtil") httpResponse: HttpResponseUtil,
        @inject("ItemEventRouter") itemEventRouter: ItemEventRouter
    ) {
        this.httpResponse = httpResponse;
        this.itemEventRouter = itemEventRouter;
    }

    async handleEvents(req: FastifyRequest<{ Body: IItemEventRouterRequest }>) {
        const eventResponse = await this.itemEventRouter.handleEvents(req.body, req.sessionId);
        const result = this.isCriticalError(eventResponse.warnings)
            ? this.httpResponse.getBody(
                  eventResponse,
                  this.getErrorCode(eventResponse.warnings),
                  eventResponse.warnings[0].errmsg
              )
            : this.httpResponse.getBody(eventResponse);
        return result;
    }

    private isCriticalError(warnings: Warning[]): boolean {
        const nonCriticalErrorCodes: BackendErrorCodes[] = [BackendErrorCodes.NOTENOUGHSPACE];
        for (const warning of warnings) {
            if (!nonCriticalErrorCodes.includes(+(warning?.code ?? "0"))) return true;
        }
        return false;
    }

    private getErrorCode(warnings: Warning[]): number {
        if (warnings[0]?.code) return Number(warnings[0].code);
        return BackendErrorCodes.UNKNOWN_ERROR;
    }

    registerRoutes(fastify: FastifyInstance) {
        fastify.get("/client/game/profile/items/moving", this.handleEvents.bind(this));
    }
}
