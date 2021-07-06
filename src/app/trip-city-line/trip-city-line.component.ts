import { Component, Input, OnInit } from '@angular/core';
import { TripDTO } from '../dto/trip.dto';

@Component({
  selector: 'app-trip-city-line',
  templateUrl: './trip-city-line.component.html',
  styleUrls: ['./trip-city-line.component.scss']
})
export class TripCityLineComponent implements OnInit {

  @Input() public trip: TripDTO;

  constructor() { }

  ngOnInit(): void {
    console.log(this.trip);
    
  }

}
