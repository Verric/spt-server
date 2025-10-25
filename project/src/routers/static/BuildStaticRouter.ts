import { BuildsCallbacks } from "@spt/callbacks/BuildsCallbacks";
import { StaticRouter } from "@spt/di/Router";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { IUserBuilds } from "@spt/models/eft/profile/ISptProfile";
import { inject, injectable } from "tsyringe";

@injectable()
export class BuildsStaticRouter extends StaticRouter {
    constructor(@inject("BuildsCallbacks") buildsCallbacks: BuildsCallbacks) {
        super([
            {
                url: "/client/builds/list",
                action: async (url, info, sessionID, output): Promise<IGetBodyResponseData<IUserBuilds>> => {
                    return buildsCallbacks.getBuilds(url, info, sessionID);
                },
            },
            {
                url: "/client/builds/magazine/save",
                action: async (url, info, sessionID, output): Promise<INullResponseData> => {
                    return buildsCallbacks.createMagazineTemplate(url, info, sessionID);
                },
            },
            {
                url: "/client/builds/weapon/save",
                action: async (url, info, sessionID, output): Promise<INullResponseData> => {
                    return buildsCallbacks.setWeapon(url, info, sessionID);
                },
            },
            {
                url: "/client/builds/equipment/save",
                action: async (url, info, sessionID, output): Promise<INullResponseData> => {
                    return buildsCallbacks.setEquipment(url, info, sessionID);
                },
            },
            {
                url: "/client/builds/delete",
                action: async (url, info, sessionID, output): Promise<INullResponseData> => {
                    return buildsCallbacks.deleteBuild(url, info, sessionID);
                },
            },
        ]);
    }
}
