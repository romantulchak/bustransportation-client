import { Component, OnInit } from '@angular/core';
import { CityDTO } from '../dto/city.dto';
import { TripDTO } from '../dto/trip.dto';
import { CityService } from '../service/city.service';
import { TripTemplateService } from '../service/trip-template.service';
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
  public currentPage = 0;
  constructor(private tripService: TripService) { }

  ngOnInit(): void {
    this.getTripsForUser();
  }

  private getTripsForUser(){
    this.tripService.getTripsForUser(this.currentPage).subscribe(
      res=>{
        this.trips = res.model;        
      }
    );
  }

  public showCities(trip: TripDTO){
    this.tripService.getTripStopsByTripId(trip.id).subscribe(
      res=>{
        this.currentTripId = trip.id;
        this.currentTrip = trip;
        this.currentTrip.stops = res;
        
      }
    );
  }

  public preDelete(id: number){
    this.tripService.preDeleteTrip(id).subscribe(
      res=>{
        console.log("ok");
      }
    );
  }
}
