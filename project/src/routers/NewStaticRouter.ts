import { RouteAction, StaticRouter } from "@spt/di/Router";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";

export class OmniStaticRouter extends StaticRouter {}

const staticRoutes: RouteAction[] = [
    {
        url: "/client/achievement/list",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IGetAchievementsResponse>> => {
            return achievementCallbacks.getAchievements(url, info, sessionID);
        },
    },

    {
        url: "/client/achievement/statistic",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<ICompletedAchievementsResponse>> => {
            return achievementCallbacks.statistic(url, info, sessionID);
        },
    },
    {
        url: "/client/game/bot/generate",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IBotBase[]>> => {
            return botCallbacks.generateBots(url, info, sessionID);
        },
    },
    {
        url: "/client/builds/list",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IUserBuilds>> => {
            return buildsCallbacks.getBuilds(url, info, sessionID);
        },
    },
    {
        url: "/client/builds/magazine/save",
        action: async (url, info, sessionID): Promise<INullResponseData> => {
            return buildsCallbacks.createMagazineTemplate(url, info, sessionID);
        },
    },
    {
        url: "/client/builds/weapon/save",
        action: async (url, info, sessionID): Promise<INullResponseData> => {
            return buildsCallbacks.setWeapon(url, info, sessionID);
        },
    },
    {
        url: "/client/builds/equipment/save",
        action: async (url, info, sessionID): Promise<INullResponseData> => {
            return buildsCallbacks.setEquipment(url, info, sessionID);
        },
    },
    {
        url: "/client/builds/delete",
        action: async (url, info, sessionID): Promise<INullResponseData> => {
            return buildsCallbacks.deleteBuild(url, info, sessionID);
        },
    },
    {
        url: "/singleplayer/bundles",
        action: async (url, info, sessionID): Promise<string> => {
            return bundleCallbacks.getBundles(url, info, sessionID);
        },
    },
    {
        url: "/singleplayer/log",
        action: async (url, info, sessionID): Promise<INullResponseData> => {
            return clientLogCallbacks.clientLog(url, info, sessionID);
        },
    },
    {
        url: "/singleplayer/release",
        action: async (): Promise<string> => clientLogCallbacks.releaseNotes(),
    },
    {
        url: "/singleplayer/enableBSGlogging",
        action: async (): Promise<string> => clientLogCallbacks.bsgLogging(),
    },
    {
        url: "/client/trading/customization/storage",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<ICustomisationStorage[]>> => {
            return customizationCallbacks.getCustomisationUnlocks(url, info, sessionID);
        },
    },
    {
        url: "/client/hideout/customization/offer/list",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IHideoutCustomisation>> => {
            return customizationCallbacks.getHideoutCustomisation(url, info, sessionID);
        },
    },
    {
        url: "/client/customization/storage",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<ICustomisationStorage[]>> => {
            return customizationCallbacks.getStorage(url, info, sessionID);
        },
    },
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
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<Record<string, ICustomizationItem>>> => {
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
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<Record<string, string>>> => {
            return dataCallbacks.getLocalesLanguages(url, info, sessionID);
        },
    },
    {
        url: "/client/hideout/qte/list",
        action: async (url, info, sessionID): Promise<string> => {
            return dataCallbacks.getQteList(url, info, sessionID);
        },
    },

    {
        url: "/client/chatServer/list",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IChatServer[]>> => {
            return dialogueCallbacks.getChatServerList(url, info, sessionID);
        },
    },
    {
        url: "/client/mail/dialog/list",
        action: (url, info, sessionID): Promise<IGetBodyResponseData<IDialogueInfo[]>> => {
            return dialogueCallbacks.getMailDialogList(url, info, sessionID);
        },
    },
    {
        url: "/client/mail/dialog/view",
        action: (url, info, sessionID): Promise<IGetBodyResponseData<IGetMailDialogViewResponseData>> => {
            return dialogueCallbacks.getMailDialogView(url, info, sessionID);
        },
    },
    {
        url: "/client/mail/dialog/info",
        action: (url, info, sessionID): Promise<IGetBodyResponseData<IDialogueInfo>> => {
            return dialogueCallbacks.getMailDialogInfo(url, info, sessionID);
        },
    },
    {
        url: "/client/mail/dialog/remove",
        action: (url, info, sessionID): Promise<IGetBodyResponseData<any[]>> => {
            return dialogueCallbacks.removeDialog(url, info, sessionID);
        },
    },
    {
        url: "/client/mail/dialog/pin",
        action: (url, info, sessionID): Promise<IGetBodyResponseData<any[]>> => {
            return dialogueCallbacks.pinDialog(url, info, sessionID);
        },
    },
    {
        url: "/client/mail/dialog/unpin",
        action: (url, info, sessionID): Promise<IGetBodyResponseData<any[]>> => {
            return dialogueCallbacks.unpinDialog(url, info, sessionID);
        },
    },
    {
        url: "/client/mail/dialog/read",
        action: (url, info, sessionID): Promise<IGetBodyResponseData<any[]>> => {
            return dialogueCallbacks.setRead(url, info, sessionID);
        },
    },
    {
        url: "/client/mail/dialog/getAllAttachments",
        action: (url, info, sessionID): Promise<IGetBodyResponseData<IGetAllAttachmentsResponse>> => {
            return dialogueCallbacks.getAllAttachments(url, info, sessionID);
        },
    },
    {
        url: "/client/mail/msg/send",
        action: (url, info, sessionID): Promise<IGetBodyResponseData<string>> => {
            return dialogueCallbacks.sendMessage(url, info, sessionID);
        },
    },
    {
        url: "/client/mail/dialog/clear",
        action: (url, info, sessionID): Promise<IGetBodyResponseData<any[]>> => {
            return dialogueCallbacks.clearMail(url, info, sessionID);
        },
    },
    {
        url: "/client/mail/dialog/group/create",
        action: (url, info: ICreateGroupMailRequest, sessionID): Promise<IGetBodyResponseData<any[]>> => {
            return dialogueCallbacks.createGroupMail(url, info, sessionID);
        },
    },
    {
        url: "/client/mail/dialog/group/owner/change",
        action: (url, info: IChangeGroupMailOwnerRequest, sessionID): Promise<IGetBodyResponseData<any[]>> => {
            return dialogueCallbacks.changeMailGroupOwner(url, info, sessionID);
        },
    },
    {
        url: "/client/mail/dialog/group/users/add",
        action: (url, info: IAddUserGroupMailRequest, sessionID): Promise<IGetBodyResponseData<any[]>> => {
            return dialogueCallbacks.addUserToMail(url, info, sessionID);
        },
    },
    {
        url: "/client/mail/dialog/group/users/remove",
        action: (url, info: IRemoveUserGroupMailRequest, sessionID): Promise<IGetBodyResponseData<any[]>> => {
            return dialogueCallbacks.removeUserFromMail(url, info, sessionID);
        },
    },
    {
        url: "/client/friend/list",
        action: (url, info, sessionID): Promise<IGetBodyResponseData<IGetFriendListDataResponse>> => {
            return dialogueCallbacks.getFriendList(url, info, sessionID);
        },
    },
    {
        url: "/client/friend/request/list/outbox",
        action: (url, info, sessionID): Promise<IGetBodyResponseData<any[]>> => {
            return dialogueCallbacks.listOutbox(url, info, sessionID);
        },
    },
    {
        url: "/client/friend/request/list/inbox",
        action: (url, info, sessionID): Promise<IGetBodyResponseData<any[]>> => {
            return dialogueCallbacks.listInbox(url, info, sessionID);
        },
    },
    {
        url: "/client/friend/request/send",
        action: (url, info, sessionID): Promise<IGetBodyResponseData<IFriendRequestSendResponse>> => {
            return dialogueCallbacks.sendFriendRequest(url, info, sessionID);
        },
    },
    {
        url: "/client/friend/request/accept-all",
        action: (url, info, sessionID): any => {
            return dialogueCallbacks.acceptAllFriendRequests(url, info, sessionID);
        },
    },
    {
        url: "/client/friend/request/accept",
        action: (url, info, sessionID): Promise<IGetBodyResponseData<boolean>> => {
            return dialogueCallbacks.acceptFriendRequest(url, info, sessionID);
        },
    },
    {
        url: "/client/friend/request/decline",
        action: (url, info, sessionID): any => {
            return dialogueCallbacks.declineFriendRequest(url, info, sessionID);
        },
    },
    {
        url: "/client/friend/request/cancel",
        action: (url, info, sessionID): Promise<IGetBodyResponseData<boolean>> => {
            return dialogueCallbacks.cancelFriendRequest(url, info, sessionID);
        },
    },
    {
        url: "/client/friend/delete",
        action: (url, info, sessionID): Promise<INullResponseData> => {
            return dialogueCallbacks.deleteFriend(url, info, sessionID);
        },
    },
    {
        url: "/client/friend/ignore/set",
        action: (url, info, sessionID): Promise<INullResponseData> => {
            return dialogueCallbacks.ignoreFriend(url, info, sessionID);
        },
    },
    {
        url: "/client/friend/ignore/remove",
        action: (url, info, sessionID): Promise<INullResponseData> => {
            return dialogueCallbacks.unIgnoreFriend(url, info, sessionID);
        },
    },
    {
        url: "/client/game/config",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IGameConfigResponse>> => {
            return gameCallbacks.getGameConfig(url, info, sessionID);
        },
    },
    {
        url: "/client/game/mode",
        action: (url, info, sessionID): Promise<IGetBodyResponseData<IGameModeResponse>> => {
            return gameCallbacks.getGameMode(url, info, sessionID);
        },
    },
    {
        url: "/client/server/list",
        action: (url, info, sessionID): Promise<IGetBodyResponseData<IServerDetails[]>> => {
            return gameCallbacks.getServer(url, info, sessionID);
        },
    },
    {
        url: "/client/match/group/current",
        action: (url, info, sessionID): Promise<IGetBodyResponseData<ICurrentGroupResponse>> => {
            return gameCallbacks.getCurrentGroup(url, info, sessionID);
        },
    },
    {
        url: "/client/game/version/validate",
        action: (url, info, sessionID): Promise<INullResponseData> => {
            return gameCallbacks.versionValidate(url, info, sessionID);
        },
    },
    {
        url: "/client/game/start",
        action: (url, info, sessionID): Promise<IGetBodyResponseData<IGameStartResponse>> => {
            return gameCallbacks.gameStart(url, info, sessionID);
        },
    },
    {
        url: "/client/game/logout",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IGameLogoutResponseData>> => {
            return await gameCallbacks.gameLogout(url, info, sessionID);
        },
    },
    {
        url: "/client/checkVersion",
        action: (url, info, sessionID): Promise<IGetBodyResponseData<ICheckVersionResponse>> => {
            return gameCallbacks.validateGameVersion(url, info, sessionID);
        },
    },
    {
        url: "/client/game/keepalive",
        action: (url, info, sessionID): Promise<IGetBodyResponseData<IGameKeepAliveResponse>> => {
            return gameCallbacks.gameKeepalive(url, info, sessionID);
        },
    },
    {
        url: "/singleplayer/settings/version",
        action: (url, info, sessionID): Promise<string> => {
            return gameCallbacks.getVersion(url, info, sessionID);
        },
    },
    {
        url: "/client/reports/lobby/send",
        action: (url, info, sessionID): Promise<INullResponseData> => {
            return gameCallbacks.reportNickname(url, info, sessionID);
        },
    },
    {
        url: "/client/report/send",
        action: (url, info: ISendReportRequest, sessionID): Promise<INullResponseData> => {
            return gameCallbacks.reportNickname(url, info, sessionID);
        },
    },
    {
        url: "/singleplayer/settings/getRaidTime",
        action: (url, info, sessionID): Promise<IGetRaidTimeResponse> => {
            return gameCallbacks.getRaidTime(url, info, sessionID);
        },
    },
    {
        url: "/client/survey",
        action: (url, info, sessionID): Promise<INullResponseData | IGetBodyResponseData<ISurveyResponseData>> => {
            return gameCallbacks.getSurvey(url, info, sessionID);
        },
    },
    {
        url: "/client/survey/view",
        action: (url, info, sessionID): Promise<INullResponseData> => {
            return gameCallbacks.getSurveyView(url, info, sessionID);
        },
    },
    {
        url: "/client/survey/opinion",
        action: (url, info, sessionID): Promise<INullResponseData> => {
            return gameCallbacks.sendSurveyOpinion(url, info, sessionID);
        },
    },
    {
        url: "/client/hideout/workout",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<string>> => {
            return healthCallbacks.handleWorkoutEffects(url, info, sessionID);
        },
    },
    {
        url: "/raid/profile/scavsave",
        action: async (url, info, sessionID): Promise<INullResponseData> => {
            return inraidCallbacks.saveProgress(url, info, sessionID);
        },
    },
    {
        url: "/singleplayer/settings/raid/menu",
        action: (url, info, sessionID): Promise<string> => {
            return inraidCallbacks.getRaidMenuSettings();
        },
    },
    {
        url: "/singleplayer/scav/traitorscavhostile",
        action: (url, info, sessionID): Promise<string> => {
            return inraidCallbacks.getTraitorScavHostileChance(url, info, sessionID);
        },
    },
    {
        url: "/singleplayer/bosstypes",
        action: (url, info, sessionID): Promise<string> => {
            return inraidCallbacks.getBossTypes(url, info, sessionID);
        },
    },
    {
        url: "/client/insurance/items/list/cost",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IGetInsuranceCostResponseData>> => {
            return insuranceCallbacks.getInsuranceCost(url, info, sessionID);
        },
    },
    {
        url: "/client/game/profile/items/moving",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IItemEventRouterResponse>> => {
            return itemEventCallbacks.handleEvents(url, info, sessionID);
        },
    },
    {
        url: "/launcher/ping",
        action: async (url, info, sessionID): Promise<string> => {
            return launcherCallbacks.ping(url, info, sessionID);
        },
    },
    {
        url: "/launcher/server/connect",
        action: async (url, info, sessionID): Promise<string> => {
            return launcherCallbacks.connect();
        },
    },
    {
        url: "/launcher/profile/login",
        action: async (url, info, sessionID): Promise<string> => {
            return launcherCallbacks.login(url, info, sessionID);
        },
    },
    {
        url: "/launcher/profile/register",
        action: async (url, info, sessionID): Promise<string> => {
            return await launcherCallbacks.register(url, info, sessionID);
        },
    },
    {
        url: "/launcher/profile/get",
        action: async (url, info, sessionID): Promise<string> => {
            return launcherCallbacks.get(url, info, sessionID);
        },
    },
    {
        url: "/launcher/profile/change/username",
        action: async (url, info, sessionID): Promise<string> => {
            return launcherCallbacks.changeUsername(url, info, sessionID);
        },
    },
    {
        url: "/launcher/profile/change/password",
        action: async (url, info, sessionID): Promise<string> => {
            return launcherCallbacks.changePassword(url, info, sessionID);
        },
    },
    {
        url: "/launcher/profile/change/wipe",
        action: async (url, info, sessionID): Promise<string> => {
            return launcherCallbacks.wipe(url, info, sessionID);
        },
    },
    {
        url: "/launcher/profile/remove",
        action: async (url, info, sessionID): Promise<string> => {
            return await launcherCallbacks.removeProfile(url, info, sessionID);
        },
    },
    {
        url: "/launcher/profile/compatibleTarkovVersion",
        action: async (url, info, sessionID): Promise<string> => {
            return launcherCallbacks.getCompatibleTarkovVersion();
        },
    },
    {
        url: "/launcher/server/version",
        action: async (url, info, sessionID): Promise<string> => {
            return launcherCallbacks.getServerVersion();
        },
    },
    {
        url: "/launcher/server/loadedServerMods",
        action: async (url, info, sessionID): Promise<string> => {
            return launcherCallbacks.getLoadedServerMods();
        },
    },
    {
        url: "/launcher/server/serverModsUsedByProfile",
        action: async (url, info, sessionID): Promise<string> => {
            return launcherCallbacks.getServerModsProfileUsed(url, info, sessionID);
        },
    },
    {
        url: "/client/locations",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<ILocationsGenerateAllResponse>> => {
            return locationCallbacks.getLocationData(url, info, sessionID);
        },
    },
    {
        url: "/client/airdrop/loot",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IGetAirdropLootResponse>> => {
            return locationCallbacks.getAirdropLoot(url, info, sessionID);
        },
    },
    {
        url: "/client/match/available",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<boolean>> => {
            return matchCallbacks.serverAvailable(url, info, sessionID);
        },
    },
    {
        url: "/client/match/updatePing",
        action: async (url, info, sessionID): Promise<INullResponseData> => {
            return matchCallbacks.updatePing(url, info, sessionID);
        },
    },
    {
        url: "/client/match/join",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IProfileStatusResponse>> => {
            return matchCallbacks.joinMatch(url, info, sessionID);
        },
    },
    {
        url: "/client/match/exit",
        action: async (url, info, sessionID): Promise<INullResponseData> => {
            return matchCallbacks.exitMatch(url, info, sessionID);
        },
    },
    {
        url: "/client/match/group/delete",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<boolean>> => {
            return matchCallbacks.deleteGroup(url, info, sessionID);
        },
    },
    {
        url: "/client/match/group/leave",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<boolean>> => {
            return matchCallbacks.leaveGroup(url, info, sessionID);
        },
    },
    {
        url: "/client/match/group/status",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IMatchGroupStatusResponse>> => {
            return matchCallbacks.getGroupStatus(url, info, sessionID);
        },
    },
    {
        url: "/client/match/group/start_game",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IProfileStatusResponse>> => {
            return matchCallbacks.joinMatch(url, info, sessionID);
        },
    },
    {
        url: "/client/match/group/exit_from_menu",
        action: async (url, info, sessionID): Promise<INullResponseData> => {
            return matchCallbacks.exitFromMenu(url, info, sessionID);
        },
    },
    {
        url: "/client/match/group/current",
        action: async (
            url,
            info: IEmptyRequestData,
            sessionID
        ): Promise<IGetBodyResponseData<IMatchGroupCurrentResponse>> => {
            return matchCallbacks.groupCurrent(url, info, sessionID);
        },
    },
    {
        url: "/client/match/group/looking/start",
        action: async (url, info, sessionID): Promise<INullResponseData> => {
            return matchCallbacks.startGroupSearch(url, info, sessionID);
        },
    },
    {
        url: "/client/match/group/looking/stop",
        action: async (url, info, sessionID): Promise<INullResponseData> => {
            return matchCallbacks.stopGroupSearch(url, info, sessionID);
        },
    },
    {
        url: "/client/match/group/invite/send",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<string>> => {
            return matchCallbacks.sendGroupInvite(url, info, sessionID);
        },
    },
    {
        url: "/client/match/group/invite/accept",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IGroupCharacter[]>> => {
            return matchCallbacks.acceptGroupInvite(url, info, sessionID);
        },
    },
    {
        url: "/client/match/group/invite/decline",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<any>> => {
            return matchCallbacks.declineGroupInvite(url, info, sessionID);
        },
    },
    {
        url: "/client/match/group/invite/cancel",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<boolean>> => {
            return matchCallbacks.cancelGroupInvite(url, info, sessionID);
        },
    },
    {
        url: "/client/match/group/invite/cancel-all",
        action: async (url, info: IEmptyRequestData, sessionID): Promise<IGetBodyResponseData<boolean>> => {
            return matchCallbacks.cancelAllGroupInvite(url, info, sessionID);
        },
    },
    {
        url: "/client/match/group/transfer",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<boolean>> => {
            return matchCallbacks.transferGroup(url, info, sessionID);
        },
    },
    {
        url: "/client/match/group/raid/ready",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<boolean>> => {
            return matchCallbacks.raidReady(url, info, sessionID);
        },
    },
    {
        url: "/client/match/group/raid/not-ready",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<boolean>> => {
            return matchCallbacks.notRaidReady(url, info, sessionID);
        },
    },
    {
        url: "/client/putMetrics",
        action: async (url, info, sessionID): Promise<INullResponseData> => {
            return matchCallbacks.putMetrics(url, info, sessionID);
        },
    },
    {
        url: "/client/analytics/event-disconnect",
        action: async (url, info, sessionID): Promise<INullResponseData> => {
            return matchCallbacks.eventDisconnect(url, info, sessionID);
        },
    },
    {
        url: "/client/getMetricsConfig",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IMetrics>> => {
            return matchCallbacks.getMetrics(url, info, sessionID);
        },
    },
    {
        url: "/client/raid/configuration",
        action: async (url, info, sessionID): Promise<INullResponseData> => {
            return matchCallbacks.getRaidConfiguration(url, info, sessionID);
        },
    },
    {
        url: "/client/raid/configuration-by-profile",
        action: async (url, info, sessionID): Promise<INullResponseData> => {
            return matchCallbacks.getConfigurationByProfile(url, info, sessionID);
        },
    },
    {
        url: "/client/match/group/player/remove",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<boolean>> => {
            return matchCallbacks.removePlayerFromGroup(url, info, sessionID);
        },
    },
    {
        url: "/client/match/local/start",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IStartLocalRaidResponseData>> => {
            return matchCallbacks.startLocalRaid(url, info, sessionID);
        },
    },
    {
        url: "/client/match/local/end",
        action: async (url, info, sessionID): Promise<INullResponseData> => {
            return matchCallbacks.endLocalRaid(url, info, sessionID);
        },
    },
    {
        url: "/client/notifier/channel/create",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<INotifierChannel>> => {
            return notifierCallbacks.createNotifierChannel(url, info, sessionID);
        },
    },
    {
        url: "/client/game/profile/select",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<ISelectProfileResponse>> => {
            return notifierCallbacks.selectProfile(url, info, sessionID);
        },
    },
    {
        url: "/client/prestige/list",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<any>> => {
            return prestigeCallbacks.getPrestige(url, info, sessionID);
        },
    },

    {
        url: "/client/prestige/obtain",
        action: async (url, info, sessionID, _output): Promise<INullResponseData> => {
            return await prestigeCallbacks.obtainPrestige(url, info, sessionID);
        },
    },
    {
        url: "/client/game/profile/create",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<ICreateProfileResponse>> => {
            return profileCallbacks.createProfile(url, info, sessionID);
        },
    },
    {
        url: "/client/game/profile/list",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IPmcData[]>> => {
            return profileCallbacks.getProfileData(url, info, sessionID);
        },
    },
    {
        url: "/client/game/profile/savage/regenerate",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IPmcData[]>> => {
            return profileCallbacks.regenerateScav(url, info, sessionID);
        },
    },
    {
        url: "/client/game/profile/voice/change",
        action: async (url, info, sessionID): Promise<INullResponseData> => {
            return profileCallbacks.changeVoice(url, info, sessionID);
        },
    },
    {
        url: "/client/game/profile/nickname/change",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<any>> => {
            return profileCallbacks.changeNickname(url, info, sessionID);
        },
    },
    {
        url: "/client/game/profile/nickname/validate",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<any>> => {
            return profileCallbacks.validateNickname(url, info, sessionID);
        },
    },
    {
        url: "/client/game/profile/nickname/reserved",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<string>> => {
            return profileCallbacks.getReservedNickname(url, info, sessionID);
        },
    },
    {
        url: "/client/profile/status",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IGetProfileStatusResponseData>> => {
            return profileCallbacks.getProfileStatus(url, info, sessionID);
        },
    },
    {
        url: "/client/profile/view",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IGetOtherProfileResponse>> => {
            return profileCallbacks.getOtherProfile(url, info, sessionID);
        },
    },
    {
        url: "/client/profile/settings",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<boolean>> => {
            return profileCallbacks.getProfileSettings(url, info, sessionID);
        },
    },
    {
        url: "/client/game/profile/search",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<ISearchFriendResponse[]>> => {
            return profileCallbacks.searchFriend(url, info, sessionID);
        },
    },
    {
        url: "/launcher/profile/info",
        action: async (url, info, sessionID): Promise<string> => {
            return profileCallbacks.getMiniProfile(url, info, sessionID);
        },
    },
    {
        url: "/launcher/profiles",
        action: async (url, info, sessionID): Promise<string> => {
            return profileCallbacks.getAllMiniProfiles(url, info, sessionID);
        },
    },
    {
        url: "/client/quest/list",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IQuest[]>> => {
            return questCallbacks.listQuests(url, info, sessionID);
        },
    },
    {
        url: "/client/repeatalbeQuests/activityPeriods",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IPmcDataRepeatableQuest[]>> => {
            return questCallbacks.activityPeriods(url, info, sessionID);
        },
    },
    {
        url: "/client/ragfair/search",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IGetOffersResult>> => {
            return ragfairCallbacks.search(url, info, sessionID);
        },
    },
    {
        url: "/client/ragfair/find",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IGetOffersResult>> => {
            return ragfairCallbacks.search(url, info, sessionID);
        },
    },
    {
        url: "/client/ragfair/itemMarketPrice",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IGetItemPriceResult>> => {
            return ragfairCallbacks.getMarketPrice(url, info, sessionID);
        },
    },
    {
        url: "/client/ragfair/offerfees",
        action: async (url, info, sessionID): Promise<INullResponseData> => {
            return ragfairCallbacks.storePlayerOfferTaxAmount(url, info, sessionID);
        },
    },
    {
        url: "/client/reports/ragfair/send",
        action: async (url, info, sessionID): Promise<INullResponseData> => {
            return ragfairCallbacks.sendReport(url, info, sessionID);
        },
    },
    {
        url: "/client/items/prices",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<Record<string, number>>> => {
            return ragfairCallbacks.getFleaPrices(url, info, sessionID);
        },
    },
    {
        url: "/client/ragfair/offer/findbyid",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IRagfairOffer>> => {
            return ragfairCallbacks.getFleaOfferById(url, info, sessionID);
        },
    },
    {
        url: "/client/trading/api/traderSettings",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<ITraderBase[]>> => {
            return traderCallbacks.getTraderSettings(url, info, sessionID);
        },
    },
    {
        url: "/singleplayer/moddedTraders",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IModdedTraders>> => {
            return traderCallbacks.getModdedTraderData(url, info, sessionID);
        },
    },
    {
        url: "/client/weather",
        action: async (url, info, sessionID): Promise<IGetBodyResponseData<IWeatherData>> => {
            return weatherCallbacks.getWeather(url, info, sessionID);
        },
    },

    {
        url: "/client/localGame/weather",
        action: async (url, info, sessionID, _output): Promise<IGetBodyResponseData<IGetLocalWeatherResponseData>> => {
            return weatherCallbacks.getLocalWeather(url, info, sessionID);
        },
    },
];
