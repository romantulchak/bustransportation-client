import { Component, OnInit } from '@angular/core';
import { CityDTO } from '../dto/city.dto';
import { TripDTO } from '../dto/trip.dto';
import { Trip } from '../model/trip.model';
import { CityService } from '../service/city.service';
import { RouteService } from '../service/route.service';
import { TripService } from '../service/trip.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public trips: CityDTO[];
  public currentDate = new Date();
  constructor(private cityService: CityService,
              private routeService: RouteService) { }

  ngOnInit(): void {
  }
  public searchDirection(date: string, numberOfSeats:number,from: string, to:string){
    console.log(date);
    
      this.routeService.getRoutesByDirectionAndDate(from, to, date, numberOfSeats).subscribe(
        res=>{
          console.log(res);
          
        }
      );
    // this.cityService.getCityTrips(date, numberOfSeats, directionFrom, directionTo).subscribe(
    //   res=>{
    //     if(res != null){
    //       this.trips = res;
    //       console.log(res);
          
    //     }
    //   }
    // );
  }
}
