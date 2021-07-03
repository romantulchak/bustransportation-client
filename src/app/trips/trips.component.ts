import { Component, OnInit } from '@angular/core';
import { TripDTO } from '../dto/trip.dto';

import { Bus } from '../model/bus.model';
import { Direction } from '../model/direction.model';
import { Trip } from '../model/trip.model';
import { BusService } from '../service/bus.service';
import { DirectionService } from '../service/direction.service';
import { TripService } from '../service/trip.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {

  constructor(private busService: BusService, private directionService: DirectionService, private tripService: TripService) { }
  public buses: Bus[];
  public directions: Direction[];
  public trips: TripDTO[] = [];
  public trip: Trip = new Trip();
  public currentDate = new Date();
  ngOnInit(): void {
    this.getTrips();
    this.getBuses();
    this.getDirections();
  }


  private getBuses(){
    this.busService.getBuses().subscribe(
      res=>{
        if(res != null){
          this.buses = res;
        }
      }
    );
  }
  private getDirections(){
    this.directionService.getDirections().subscribe(
      res=>{
        if(res != null){
          this.directions = res;
        }
      }
    );
  }

  private getTrips(){
    this.tripService.getTrips().subscribe(
      res=>{
        if(res != null){
          res.forEach(x=>x.date = new Date(x.date));
          console.log(res[0].date);
          console.log(this.currentDate);
          
          this.trips = res;
          
        }
      }
    );
  }

  public createTrip(){
    this.trip.numberOfSeats = this.trip.bus.numberOfSeats;
    this.tripService.createTrip(this.trip).subscribe(
      res=>{
        if(res != null){
          this.trips.push(res);
        }
      }
    );

  }

}
