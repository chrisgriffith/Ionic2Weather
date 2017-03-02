import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Refresher } from 'ionic-angular';
import { WeatherService } from '../../providers/weather-service';
import { Geolocation } from 'ionic-native';
import { CurrentLoc } from '../../interfaces/current-loc';

@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html'
})
export class WeatherPage {
  theWeather: any = {};
  currentData: any = {};
  daily: any = {};
  loader: LoadingController;
  refresher: Refresher;
  currentLoc: CurrentLoc = { lat: 0, lon: 0 };
  pageTitle: string = 'Current Location';

  constructor(public navCtrl: NavController, public navParams: NavParams, public weatherService: WeatherService, public loadingCtrl: LoadingController) {
    let loader = this.loadingCtrl.create({
      content: "Loading weather data...",
      duration: 3000
    });
    loader.present();

    let loc: CurrentLoc = this.navParams.get('geoloc');

    if (loc === undefined) {

      Geolocation.getCurrentPosition().then(pos => {
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
        this.currentLoc.lat = pos.coords.latitude;
        this.currentLoc.lon = pos.coords.longitude;
        this.currentLoc.timestamp = pos.timestamp;
        return this.currentLoc;
      }).then(currentLoc => {
        weatherService.getWeather(currentLoc).then(theResult => {
          this.theWeather = theResult;
          this.currentData = this.theWeather.currently;
          this.daily = this.theWeather.daily;
          loader.dismiss();
        });
      });
    } else {
      this.currentLoc = loc;
      this.pageTitle = this.navParams.get('title');
      weatherService.getWeather(this.currentLoc).then(theResult => {
        this.theWeather = theResult;
        this.currentData = this.theWeather.currently;
        this.daily = this.theWeather.daily;
        loader.dismiss();
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeatherPage');
  }

  doRefresh(refresher) {
    this.weatherService.getWeather(this.currentLoc).then(theResult => {
      this.theWeather = theResult;
      this.currentData = this.theWeather.currently;
      this.daily = this.theWeather.daily;
      refresher.complete();
    });
  }
}
