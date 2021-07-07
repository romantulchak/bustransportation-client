import { Component, OnInit } from '@angular/core';
import { CityDTO } from '../dto/city.dto';
import { TripDTO } from '../dto/trip.dto';
import { CityService } from '../service/city.service';
import { TripService } from '../service/trip.service';

@Component({
  selector: 'app-user-trips',
  templateUrl: './user-trips.component.html',
  styleUrls: ['./user-trips.component.scss']
})
export class UserTripsComponent implements OnInit {

  public trips: TripDTO[];
  public currentTripId: number;
  public currentTrip: TripDTO = new TripDTO(); 
  constructor(private tripService: TripService,
              private cityService: CityService) { }

  ngOnInit(): void {
    this.getTripsForUser();
  }

  private getTripsForUser(){
    this.tripService.getTripsForUser().subscribe(
      res=>{
        this.trips = res;        
      }
    );
  }

  public showCities(trip: TripDTO){
    this.cityService.getCitiesForTrip(trip.id).subscribe(
      res=>{
        this.currentTripId = trip.id;
        this.currentTrip = trip;
        this.currentTrip.cities = res;
      }
    );
  }

}
