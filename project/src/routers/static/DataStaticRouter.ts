import { DataCallbacks } from "@spt/callbacks/DataCallbacks";
import { StaticRouter } from "@spt/di/Router";
import { IGlobals } from "@spt/models/eft/common/IGlobals";
import { ICustomizationItem } from "@spt/models/eft/common/tables/ICustomizationItem";
import { IHandbookBase } from "@spt/models/eft/common/tables/IHandbookBase";
import { IHideoutArea } from "@spt/models/eft/hideout/IHideoutArea";
import { IHideoutProductionData } from "@spt/models/eft/hideout/IHideoutProduction";
import { IHideoutSettingsBase } from "@spt/models/eft/hideout/IHideoutSettingsBase";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { ISettingsBase } from "@spt/models/spt/server/ISettingsBase";
import { inject, injectable } from "tsyringe";

@injectable()
export class DataStaticRouter extends StaticRouter {
    constructor(@inject("DataCallbacks") dataCallbacks: DataCallbacks) {
        super([
            {
                url: "/client/settings",
                action: async (url, info, sessionID): Promise<IGetBodyResponseData<ISettingsBase>> => {
                    return dataCallbacks.getSettings(url, info, sessionID);
                },
            },
            {
                url: "/client/globals",
                action: async (url, info, sessionID): Promise<IGetBodyResponseData<IGlobals>> => {
                    return dataCallbacks.getGlobals(url, info, sessionID);
                },
            },
            {
                url: "/client/items",
                action: async (url, info, sessionID): Promise<string> => {
                    return dataCallbacks.getTemplateItems(url, info, sessionID);
                },
            },
            {
                url: "/client/handbook/templates",
                action: async (url, info, sessionID): Promise<IGetBodyResponseData<IHandbookBase>> => {
                    return dataCallbacks.getTemplateHandbook(url, info, sessionID);
                },
            },
            {
                url: "/client/customization",
                action: async (
                    url,
                    info,
                    sessionID
                ): Promise<IGetBodyResponseData<Record<string, ICustomizationItem>>> => {
                    return dataCallbacks.getTemplateSuits(url, info, sessionID);
                },
            },
            {
                url: "/client/account/customization",
                action: async (url, info, sessionID): Promise<IGetBodyResponseData<string[]>> => {
                    return dataCallbacks.getTemplateCharacter(url, info, sessionID);
                },
            },
            {
                url: "/client/hideout/production/recipes",
                action: async (url, info, sessionID): Promise<IGetBodyResponseData<IHideoutProductionData>> => {
                    return dataCallbacks.getHideoutProduction(url, info, sessionID);
                },
            },
            {
                url: "/client/hideout/settings",
                action: async (url, info, sessionID): Promise<IGetBodyResponseData<IHideoutSettingsBase>> => {
                    return dataCallbacks.getHideoutSettings(url, info, sessionID);
                },
            },
            {
                url: "/client/hideout/areas",
                action: async (url, info, sessionID): Promise<IGetBodyResponseData<IHideoutArea[]>> => {
                    return dataCallbacks.getHideoutAreas(url, info, sessionID);
                },
            },
            {
                url: "/client/languages",
                action: async (url, info, sessionID, output): Promise<IGetBodyResponseData<Record<string, string>>> => {
                    return dataCallbacks.getLocalesLanguages(url, info, sessionID);
                },
            },
            {
                url: "/client/hideout/qte/list",
                action: async (url: string, info: any, sessionID: string, output: string): Promise<string> => {
                    return dataCallbacks.getQteList(url, info, sessionID);
                },
            },
        ]);
    }
}
