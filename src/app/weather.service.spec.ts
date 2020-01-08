import { WeatherService } from './weather.service';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

describe('WeatherService', () => {
  it('should load weather data for giver locations array', (done) => {
    const httpClient = {
      get: () => {
        return  of({
          coord: {
            lon: -0.13,
            lat: 51.51
          },
          weather: [
            {
              id: 804,
              main: 'Clouds',
              description: 'overcast clouds',
              icon: '04n'
            }
          ],
          base: 'stations',
          main: {
            temp: 285.14,
            feels_like: 280.82,
            temp_min: 284.15,
            temp_max: 286.48,
            pressure: 1019,
            humidity: 87
          },
          visibility: 10000,
          wind: {
            speed: 6.2,
            deg: 240
          },
          clouds: {
            all: 90
          },
          dt: 1578454744,
          sys: {
            type: 1,
            id: 1414,
            country: 'GB',
            sunrise: 1578470660,
            sunset: 1578499748
          },
          timezone: 0,
          id: 2643743,
          name: 'London',
          cod: 200
        });
      }
    };
    const weatherService = new WeatherService(httpClient as unknown as HttpClient);
    weatherService.getWeather(['london']).subscribe((value) => {
      expect(value[0].name).toBe('London');
      done();
    });
  });
});
