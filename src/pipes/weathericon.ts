import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'weathericon'
})
@Injectable()
export class Weathericon {
 
  transform(value: string, args: any[]) {
    let newIcon:string ='sunny';
    let forecastNames:Array<string> = ["clear-day", "clear-night", "rain", "snow", "sleet", "wind", "fog", "cloudy", "partly-cloudy-day", "partly-cloudy-night"];
    let ioniconNames:Array<string> = ["sunny", "moon", "rainy", "snow", "snow", "cloudy", "cloudy", "cloudy", "partly-sunny", "cloudy-night"];
    let iconIndex:number = forecastNames.indexOf(value);
    if (iconIndex !== -1) {
      newIcon = ioniconNames[iconIndex];
    }

    return newIcon;
  }
}