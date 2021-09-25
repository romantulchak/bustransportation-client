import { Component, OnInit } from '@angular/core';
import { TripDTO } from '../dto/trip.dto';
import { RemoveType } from '../model/enum/removeType.enum';
import { TripService } from '../service/trip.service';

@Component({
  selector: 'app-removed-trips-dialog',
  templateUrl: './removed-trips-dialog.component.html',
  styleUrls: ['./removed-trips-dialog.component.scss']
})
export class RemovedTripsDialogComponent implements OnInit {

  constructor(private tripService: TripService) { }

  public trips: TripDTO[];
  private currentPage = 0;

  ngOnInit(): void {
    this.getPreDeletedTrips();
    this.restoreTrip();
  }

  private getPreDeletedTrips() {
    this.tripService.getPreDeletedTrips(this.currentPage).subscribe(
      res=>{
        this.trips = res.model;
      }
    );
  }

  private restoreTrip(){
    this.tripService.restoreTripSubject.subscribe(
      res=>{
        if(res != null){
          this.trips = this.trips.filter(t => t.id !== res.id);
        }
      }
    );
  }
}
