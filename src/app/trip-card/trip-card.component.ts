import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TripDTO } from '../dto/trip.dto';
import { RemoveType } from '../model/enum/removeType.enum';
import { TripService } from '../service/trip.service';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss']
})
export class TripCardComponent implements OnInit {

  @Input('trips') public trips: TripDTO[];
  @Output('preRemove') preRemove: EventEmitter<TripDTO> = new EventEmitter();
  public removeType = RemoveType;
  public currentTripId: number;
  public currentTrip: TripDTO = new TripDTO(); 
  
  constructor(private tripService: TripService) { }

  ngOnInit(): void {
    
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

  public preDelete(trip: TripDTO){
    this.tripService.preDeleteTrip(trip.id).subscribe(
      res=>{
        this.preRemove.emit(trip);
      }
    );
  }

  public fullDelete(id: number){
    this.tripService.fullDeleteTrip(id).subscribe(
      res=>{
        this.trips = this.trips.filter(trip => trip.id !== id);
      }
    );
  }

  public restoreTrip(trip: TripDTO){
    this.tripService.restoreTrip(trip.id).subscribe(
      res=>{
        this.tripService.restoreTripSubject.next(res);
      }
    );
  }
}
