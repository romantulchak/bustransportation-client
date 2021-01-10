import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Seat } from '../model/seat.model';
import { Trip } from '../model/trip.model';
import { User } from '../model/user.model';

import { TripService } from '../service/trip.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {

  private tripId: number;
  public trip: Trip;
  public seatFirstPart: Seat[] = [];
  public seatSecondPart: Seat[] = [];
  public seatsToBuy:Seat[] = [];
  public summary: number = 0;
  constructor(private router: ActivatedRoute, private tripService:TripService, private seatService:UserService) {
    router.params.subscribe(
      res=>{
        this.tripId = Number.parseInt(res.id);
      }
    );      
   }

  ngOnInit(): void {
    if(this.tripId != null && typeof this.tripId == "number"){
      this.getTripById();
    }else{
      window.location.href = "/";
      
    }
  }
  private getTripById(){
    this.tripService.getTripById(this.tripId).subscribe(
      res=>{
        if(res != null){
          if(this.tripValid(new Date(res.date))){
            res.seats.map(x=>x.checked = x.user != null);
                       
            this.trip = res;
            this.seatFirstPart = res.seats.slice(0, (res.seats.length/2) + 1);
            this.seatSecondPart = res.seats.slice(res.seats.length/2); 
            console.log(res);
            
            
          }else{
            window.location.href = "/";
          }
          
        }
      }
    );
  }

  private tripValid(date:Date):boolean{
    let currentDate = new Date();
    if(date.getTime() > currentDate.getTime()){
        return true;
    }
    return false;
    
  }
  public addUserToSeat(seat: Seat){
    let isSeatAdded = this.seatsToBuy.filter(x=>x.seatNumber == seat.seatNumber);
    if(isSeatAdded.length == 0){
    let user = new User();
    seat.user = user;
    this.seatsToBuy.push(seat);
    this.summary += this.trip.price;
    }else{
      this.seatsToBuy = this.seatsToBuy.filter(x=>x.id != seat.id);
      this.summary -= this.trip.price;
    }
  }

  public sendSeats(){
    console.log(this.seatsToBuy);
    
    this.seatService.addUserToSeat(this.seatsToBuy, this.trip).subscribe(
      res=>{
        console.log("Good");
      },
      error=>{
        console.log("Seats with number: " + error.error.message.length + " not available");
        
      }
    );
  }
}
