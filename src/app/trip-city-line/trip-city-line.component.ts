import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TripDTO } from '../dto/trip.dto';
import { CityStop } from '../model/cityStop.model';

@Component({
  selector: 'app-trip-city-line',
  templateUrl: './trip-city-line.component.html',
  styleUrls: ['./trip-city-line.component.scss']
})
export class TripCityLineComponent implements OnChanges {

  @Input("stops") public stops: CityStop[];

  constructor() { }

  ngOnChanges(): void { 
  }

}
