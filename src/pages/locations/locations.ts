import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { WeatherLocation } from '../../interfaces/weather-location';
import { LocationsService } from '../../providers/locations-service';
import { GeocodeService } from '../../providers/geocode-service';
import { WeatherPage } from '../weather/weather';

@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html'
})
export class LocationsPage {
  locs: Array<WeatherLocation>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public locationsService: LocationsService,
    public geocodeService: GeocodeService,
    public alertCtrl: AlertController,
    public events: Events) {
    locationsService.locations$.subscribe((locs: Array<WeatherLocation>) => {
      this.locs = locs;
    });
  }

  deleteLocation(loc: WeatherLocation) {
    this.locationsService.removeLocation(loc);
    this.events.publish('locations:updated', {});
  }

  addLocation() {
    let prompt = this.alertCtrl.create({
      title: 'Add a City',
      message: "Enter the city's name",
      inputs: [
        {
          name: 'title',
          placeholder: 'City name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            if (data.title != '') {
              this.geocodeService.getLatLong(data.title).then(res => {
                let newLoc = {
                  title: '', component: WeatherPage, icon: 'pin',
                  loc: { lat: 0, lon: 0 }
                }
                newLoc.title = res.name;
                newLoc.loc.lat = res.location.latitude;
                newLoc.loc.lon = res.location.longitude;

                this.locationsService.addLocation(newLoc);
                this.events.publish('locations:updated', {});
              });
            }
          }
        }
      ]
    });

    prompt.present();
  }

}
