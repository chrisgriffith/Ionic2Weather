import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { CurrentLoc } from '../interfaces/current-loc'

@Injectable()
export class WeatherService {
  data: any = null;

  constructor(public http: Http) {
    console.log('Hello WeatherService Provider');
  }

  load(currentLoc: CurrentLoc) {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get('/api/forecast/' + currentLoc.lat + ',' + currentLoc.lon)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getWeather(currentLoc: CurrentLoc) {
    this.data = null;
    return this.load(currentLoc).then(data => {
      return data;
    });
  }
}