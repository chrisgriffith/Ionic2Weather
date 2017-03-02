import { CurrentLoc } from './current-loc';

export interface WeatherLocation {
  title: string;
  component: any;
  icon: string;
  loc?: CurrentLoc;
}