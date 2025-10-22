import { OnLoad } from "@spt/di/OnLoad";
import { HttpServer } from "@spt/servers/HttpServer";
import { inject, injectable } from "tsyringe";

@injectable()
export class HttpCallbacks implements OnLoad {
    protected httpServer: HttpServer;

    constructor(@inject("HttpServer") httpServer: HttpServer) {
        this.httpServer = httpServer;
    }

    public async onLoad(): Promise<void> {
        await this.httpServer.load();
    }

    public getRoute(): string {
        return "spt-http";
    }

    public getImage(): string {
        return "";
    }
}
