import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TripDTO } from '../dto/trip.dto';
import { RemovedTripsDialogComponent } from '../removed-trips-dialog/removed-trips-dialog.component';
import { PageableService } from '../service/pageable.service';
import { TripService } from '../service/trip.service';

@Component({
  selector: 'app-user-trips',
  templateUrl: './user-trips.component.html',
  styleUrls: ['./user-trips.component.scss']
})
export class UserTripsComponent implements OnInit {

  public trips: TripDTO[];
  public currentPage = 1;
  public countPreDeletedTrips: number;
  constructor(private tripService: TripService,
              private pageableService: PageableService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTripsForUser(this.currentPage);
    this.getCountPreDeletedTrips();
    this.restoreTrip();
  }

  public getTripsForUser(page: number){
    this.tripService.getTripsForUser(page).subscribe(
      res=>{
        this.trips = res.model;        
        this.currentPage = res.currentPage;
        this.pageableService.pageableModel.next(res);
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

  private restoreTrip(){
    this.tripService.restoreTripSubject.subscribe(
      res=>{
        if(res != null){
          this.countPreDeletedTrips--;
          this.trips.unshift(res);
        }
      }
    );
  }
}
