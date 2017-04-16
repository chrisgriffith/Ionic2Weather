import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { WeatherPage } from '../pages/weather/weather';
import { LocationsPage } from '../pages/locations/locations';
import { WeatherService } from '../providers/weather-service';
import { GeocodeService } from '../providers/geocode-service';
import { LocationsService } from '../providers/locations-service';
import { Weathericon } from '../pipes/weatherIcon';

@NgModule({
  declarations: [
    MyApp,
    WeatherPage,
    LocationsPage,
    Weathericon
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WeatherPage,
    LocationsPage
  ],
  providers: [StatusBar,
    SplashScreen,
    Geolocation,
    WeatherService,
    GeocodeService,
    LocationsService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
