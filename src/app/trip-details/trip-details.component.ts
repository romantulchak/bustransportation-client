import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CityDTO } from '../dto/city.dto';
import { SeatDTO } from '../dto/seat.dto';
import { TripDTO } from '../dto/trip.dto';
import { Booking } from '../model/booking.model';
import { Seat } from '../model/seat.model';
import { User } from '../model/user.model';
import { BookingService } from '../service/booking.service';
import { CityService } from '../service/city.service';

import { TripService } from '../service/trip.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {

  private cityId: number;
  private city: CityDTO;
  public trip: TripDTO;
  public seatFirstPart: SeatDTO[] = [];
  public seatSecondPart: SeatDTO[] = [];
  // public seatsToBuy:SeatDTO[] = [];
  public summary: number = 0;
  public success: boolean = false;
  public seatForm: FormGroup;
  public allSeats: SeatDTO[];
  constructor(private router: ActivatedRoute, 
              private tripService:TripService, 
              private cityService: CityService,
              private bookinService: BookingService,
              private fb: FormBuilder) {
    router.params.subscribe(
      res=>{
        this.cityId = Number.parseInt(res.id);
      }
    );      
   }

  ngOnInit(): void {
    // if(this.tripId != null && typeof this.tripId == "number"){
    //   this.getTripById();
    // }else{
    //   window.location.href = "/";
      
    // }
    this.initSeatForm();
    this.findTripByCityId();
    this.findCityById();
  }

  private findCityById(){
    this.cityService.getCityById(this.cityId).subscribe(
      res=>{
        this.city = res;
      }
    );
  }

  private findTripByCityId(){
    this.tripService.findTripByCityId(this.cityId).subscribe(
      res => {
        console.log(res);
        //&& x.bookings.find(booking => booking.city.direction.directionFrom === this.city.direction.directionFrom) != null
        res.seats.map(x=>x.checked = x.bookings.length != 0);
        res.seats.map(x=>x.addedToCard = false);
        this.allSeats = res.seats;
        this.seatFirstPart = this.allSeats.slice(0, (res.seats.length/2) + 1);
        this.seatSecondPart = this.allSeats.slice(res.seats.length/2);  
        this.trip = res;
        this.city = res.cities.filter(city => city.id === this.cityId)[0];
      });
  }

  public initSeatForm(){
    this.seatForm = this.fb.group({
      seats: this.fb.array([])
    })
 
  }

  public addSeat(seat: SeatDTO, index: number){
    this.seats.push(this.fb.group({
      seat: [seat, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required]
    }));
    this.addUserToSeat(seat);
  }


  get seats(): FormArray{
    return this.seatForm.get('seats') as FormArray;
  }

  public removeSeat(index?: number){
    let seat = this.allSeats.find(seat => seat.seatNumber === this.seats.value[index].seat.number);
    seat.addedToCard = false;
    this.summary -= this.city.price;
    this.seats.removeAt(index);
  }
  
  // private getTripById(){
  //   this.tripService.getTripById(this.tripId).subscribe(
  //     res=>{
  //       if(res != null){
  //         // if(this.tripValid(new Date(res.date))){
  //           
                       
  //           this.trip = res;
  //           this.seatFirstPart = res.seats.slice(0, (res.seats.length/2) + 1);
  //           this.seatSecondPart = res.seats.slice(res.seats.length/2);    
  //         }else{
  //           window.location.href = "/";
  //         }
          
  //       }
  //     // }
  //   );
  // }

  private tripValid(date:Date):boolean{
    let currentDate = new Date();
    if(date.getTime() > currentDate.getTime()){
        return true;
    }
    return false;
    
  }
  public addUserToSeat(seat: SeatDTO){
    // let isSeatAdded = this.seatsToBuy.filter(x=>x.seatNumber == seat.seatNumber);
    this.summary += this.city.price;
    seat.addedToCard = true;
    
  }

  public buySeats(){
    let bookings: Booking[] = [];
    this.seats.value.forEach(seat => {
      let booking = new Booking();
      booking.id = null;
      booking.city = null; 
      bookings.push(Object.assign(booking, seat));
    });
    this.bookinService.bookPlaces(bookings, this.cityId).subscribe(
      res=>{
        console.log("OK");
        
      }
    );
  }
  // public sendSeats(){
  //   this.seatService.addUserToSeat(this.seatsToBuy, this.trip).subscribe(
  //     res=>{
  //       this.seatsToBuy.map(x=>x.checked = true);
  //       this.seatsToBuy = [];
  //       this.success = true;
        
  //     },
  //     error=>{
  //       console.log("Seats with number: " + error.error.message.length + " not available");
        
  //     }
  //   );
  // }
}
