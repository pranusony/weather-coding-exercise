import {Component} from '@angular/core';
import {Weather, WeatherService} from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weather-coding-exerise';

  weathers: Weather[] = [];

  constructor(private weatherService: WeatherService) {}

  handleLocationsEntered(event) {
    if (event.target.value) {
      this.weathers = [];
      this.displayTimeAndWeather(event.target.value.split(',').map(location => location.trim()));
    }
  }
  displayTimeAndWeather(arrOfLocations: string[]) {
    this.weatherService.getWeather(arrOfLocations).subscribe(
      value => {
        this.weathers = value;
        console.log('locationsData', value);
      },
      err => {},
      () => console.log('All Data loaded'),
    );
  }

  getTimeAndWeather(weather) {
    return this.weatherService.getTimeAndWeather(weather);
  }
}
