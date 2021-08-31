import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CityDTO } from '../dto/city.dto';
import { UserDTO } from '../dto/user.dto';
import { CityService } from '../service/city.service';
import { RouteService } from '../service/route.service';
import { TokenStorageService } from '../service/token-storage.service';
import { TripService } from '../service/trip.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public currentDate = new Date();


  constructor(private tokenStorageService: TokenStorageService, 
              private routeService: RouteService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public searchDirection(date: string, numberOfSeats:number,directionFrom: string, directionTo:string){
    this.routeService.getRoutesByDirectionAndDate(directionFrom, directionTo, date, numberOfSeats).subscribe(
      res=>{
        this.routeService.routes.next(res);
        if(res){
          this.router.navigateByUrl('trips-found');
        }
      }
    );
    
    // this.cityService.getCityTrips(date, numberOfSeats, directionFrom, directionTo).subscribe(
    //   res=>{
    //     if(res != null){
    //       this.cityService.trips.next(res);
    //       if(res){
    //         this.router.navigateByUrl('trips-found');
    //       }
    //     }
    //   }
    // );
  }
}
