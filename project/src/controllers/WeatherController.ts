import { WeatherGenerator } from "@spt/generators/WeatherGenerator";
import { WeatherHelper } from "@spt/helpers/WeatherHelper";
import { IWeatherData } from "@spt/models/eft/weather/IWeatherData";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { IWeatherConfig } from "@spt/models/spt/config/IWeatherConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { IGetLocalWeatherResponseData } from "@spt/models/spt/weather/IGetLocalWeatherResponseData";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { RaidWeatherService } from "@spt/services/RaidWeatherService";
import { SeasonalEventService } from "@spt/services/SeasonalEventService";
import { inject, injectable } from "tsyringe";

@injectable()
export class WeatherController {
    protected weatherConfig: IWeatherConfig;
    protected weatherGenerator: WeatherGenerator;
    protected logger: ILogger;
    protected configServer: ConfigServer;
    protected seasonalEventService: SeasonalEventService;
    protected raidWeatherService: RaidWeatherService;
    protected weatherHelper: WeatherHelper;

    constructor(
        @inject("WeatherGenerator") weatherGenerator: WeatherGenerator,
        @inject("PrimaryLogger") logger: ILogger,
        @inject("ConfigServer") configServer: ConfigServer,
        @inject("SeasonalEventService") seasonalEventService: SeasonalEventService,
        @inject("RaidWeatherService") raidWeatherService: RaidWeatherService,
        @inject("WeatherHelper") weatherHelper: WeatherHelper,
    ) {
        this.weatherGenerator = weatherGenerator;
        this.logger = logger;
        this.configServer = configServer;
        this.seasonalEventService = seasonalEventService;
        this.raidWeatherService = raidWeatherService;
        this.weatherHelper = weatherHelper;
        this.weatherConfig = this.configServer.getConfig(ConfigTypes.WEATHER);
    }

    /** Handle client/weather */
    public generate(): IWeatherData {
        //@ts-expect-error weather should not be nullable, ok since this is just a default obj
        let result: IWeatherData = { acceleration: 0, time: "", date: "", weather: null, season: 1 }; // defaults, hydrated below

        result = this.weatherGenerator.calculateGameTime(result);
        result.weather = this.weatherGenerator.generateWeather(result.season);

        return result;
    }

    /** Handle client/localGame/weather */
    public generateLocal(_sesssionId: string): IGetLocalWeatherResponseData {
        const result: IGetLocalWeatherResponseData = {
            season: this.seasonalEventService.getActiveWeatherSeason(),
            weather: [],
        };

        result.weather.push(...this.raidWeatherService.getUpcomingWeather());

        return result;
    }
}
