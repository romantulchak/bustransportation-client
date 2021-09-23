import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TripDTO } from '../dto/trip.dto';
import { RemovedTripsDialogComponent } from '../removed-trips-dialog/removed-trips-dialog.component';
import { TripService } from '../service/trip.service';

@Component({
  selector: 'app-user-trips',
  templateUrl: './user-trips.component.html',
  styleUrls: ['./user-trips.component.scss']
})
export class UserTripsComponent implements OnInit {

  public trips: TripDTO[];
  public currentPage = 0;
  public countPreDeletedTrips: number = 0;
  constructor(private tripService: TripService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTripsForUser();
    this.getCountPreDeletedTrips();
  }

  private getTripsForUser(){
    this.tripService.getTripsForUser(this.currentPage).subscribe(
      res=>{
        console.log(res);
        this.trips = res.model;        
      }
    );
  }

  public openRemovedTrips(){
    this.dialog.open(RemovedTripsDialogComponent);
  }

  public getCountPreDeletedTrips(){
    this.tripService.getCountPreDeletedTrips().subscribe(
      res=>{
        this.countPreDeletedTrips = res;
      }
    );
  }

  public preRemoveUpdateCounter(trip: TripDTO){
    this.countPreDeletedTrips++;
    this.trips = this.trips.filter(t => t.id !== trip.id);
  }
}
