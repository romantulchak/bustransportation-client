import { Component, OnInit } from '@angular/core';
import { Trip } from '../model/trip.model';
import { TripService } from '../service/trip.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public trips: Trip[];
  public currentDate = new Date();
  constructor(private tripService: TripService) { }

  ngOnInit(): void {
  }
  public searchDirection(date: string, numberOfSeats:number,directionFrom: string, directionTo:string){
    
    this.tripService.getTripsByDate(date, numberOfSeats, directionFrom, directionTo).subscribe(
      res=>{
        if(res != null){
            this.trips = res;
        }
      }
    );
  }
}
