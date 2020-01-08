import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import * as moment from 'moment';
export interface Weather {
  'coord': {
    'lon': number
    'lat': number
  };

  'weather': {
    'id': number,
    'main': string,
    'description': string,
    'icon': string
  }[];

  'base': string;
  'main': {
    'temp': number,
    'feels_like': number,
    'temp_min': number,
    'temp_max': number,
    'pressure': number,
    'humidity': number
  };
  'visibility': number;
  'wind': {
    'speed': number,
    'deg': number
  };
  'clouds': {
    'all': number
  };
  'dt': number;
  'sys': {
    'type': number,
    'id': number,
    'country': string,
    'sunrise': number,
    'sunset': number
  };
  'timezone': number;
  'id': number;
  'name': string;
  'cod': number;
}


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}
  getWeather(locations: string[]): Observable<Weather[]> {
    const observableArray = [];
    const apiKey = '2d2e5388670e9d16dfe9b8567b121bd5';

    for (const location of locations) {
      observableArray.push(this.httpClient.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}`));
    }
    return forkJoin(observableArray);
  }

  getTimeAndWeather(weather: Weather) {
    const time = moment(new Date()).utc().utcOffset(weather.timezone * 1000).format('MM/DD/YY hh:mm a');
    return `Time: ${time} Weather: ${weather.weather[0].description}`;
  }
}
