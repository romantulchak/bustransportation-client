import { Component, OnInit } from '@angular/core';
import { CityDTO } from '../dto/city.dto';
import { CityService } from '../service/city.service';

@Component({
  selector: 'app-travel-found',
  templateUrl: './travel-found.component.html',
  styleUrls: ['./travel-found.component.scss']
})
export class TravelFoundComponent implements OnInit {

  public trips: CityDTO[];
  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    this.getFoundTrips();
  }

  public getFoundTrips(){
    this.cityService.trips.subscribe(
      res=>{
        this.trips = res;
        
      }
    );
  }

}
