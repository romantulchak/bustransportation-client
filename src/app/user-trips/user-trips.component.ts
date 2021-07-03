import { Component, OnInit } from '@angular/core';
import { TripService } from '../service/trip.service';

@Component({
  selector: 'app-user-trips',
  templateUrl: './user-trips.component.html',
  styleUrls: ['./user-trips.component.scss']
})
export class UserTripsComponent implements OnInit {

  constructor(private tripService: TripService) { }

  ngOnInit(): void {
    this.getTripsForUser();
  }

  private getTripsForUser(){
    this.tripService.getTripsForUser().subscribe(
      res=>{
        console.log(res);
        
      }
    );
  }

}
