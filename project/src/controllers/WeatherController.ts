import { WeatherGenerator } from "@spt/generators/WeatherGenerator";
import { IWeatherData } from "@spt/models/eft/weather/IWeatherData";
import { IGetLocalWeatherResponseData } from "@spt/models/spt/weather/IGetLocalWeatherResponseData";
import { RaidWeatherService } from "@spt/services/RaidWeatherService";
import { SeasonalEventService } from "@spt/services/SeasonalEventService";
import { inject, injectable } from "tsyringe";

@injectable()
export class WeatherController {
    private weatherGenerator: WeatherGenerator;
    private seasonalEventService: SeasonalEventService;
    private raidWeatherService: RaidWeatherService;

    constructor(
        @inject("WeatherGenerator") weatherGenerator: WeatherGenerator,
        @inject("SeasonalEventService") seasonalEventService: SeasonalEventService,
        @inject("RaidWeatherService") raidWeatherService: RaidWeatherService,
    ) {
        this.weatherGenerator = weatherGenerator;
        this.seasonalEventService = seasonalEventService;
        this.raidWeatherService = raidWeatherService;
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
