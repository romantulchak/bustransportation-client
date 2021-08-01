import { Component, OnInit } from '@angular/core';
import { CityDTO } from '../dto/city.dto';
import { UserDTO } from '../dto/user.dto';
import { CityService } from '../service/city.service';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user: UserDTO;
  public trips: CityDTO[];
  public currentDate = new Date();


  constructor(private tokenStorageService: TokenStorageService, 
              private cityService: CityService) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
  }

  public signOut(){
    this.tokenStorageService.signOut();
  }



  public searchDirection(date: string, numberOfSeats:number,directionFrom: string, directionTo:string){
    
    this.cityService.getCityTrips(date, numberOfSeats, directionFrom, directionTo).subscribe(
      res=>{
        if(res != null){
          this.trips = res;
          console.log(res);
          
        }
      }
    );
  }
}
