import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CityDTO} from '../dto/city.dto';
import {SeatDTO} from '../dto/seat.dto';
import {TripDTO} from '../dto/trip.dto';
import {Booking} from '../model/booking.model';
import {Direction} from '../model/direction.model';
import {BookingService} from '../service/booking.service';

import {TripService} from '../service/trip.service';

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
  private direction: Direction;
  public summary: number = 0;
  public success: boolean = false;
  public seatForm: FormGroup;
  public allSeats: SeatDTO[];

  constructor(private router: ActivatedRoute,
              private tripService: TripService,
              private bookinService: BookingService,
              private fb: FormBuilder) {
    router.params.subscribe(
      res => {
        this.cityId = Number.parseInt(res.id);
      }
    );
  }

  ngOnInit(): void {
    this.initSeatForm();
    this.findTripByCityId();
    this.getDirection();
  }

  private findTripByCityId(): void{
    this.tripService.findTripByCityId(this.cityId).subscribe(
      res => {
        // res.seats.map(x=>x.checked = x.tickets.length != 0 && res.cities[0].direction.directionTo === this.direction.directionTo && res.cities[0].direction.directionFrom === this.direction.directionFrom);
        //TODO: change res.cities[0].direction.distance < this.direction.distance to anything else
        // res.seats.map(x=>x.checked = (x.tickets.length != 0 && res.cities[0].direction.distance < this.direction.distance));
        res.seats.map(x => x.checked = x.tickets.find(t => t.city.direction.directionFrom === this.direction.directionFrom) != null);
        res.seats.map(x => x.addedToCard = false);
        this.allSeats = res.seats;
        this.seatFirstPart = this.allSeats.slice(0, (res.seats.length / 2));
        this.seatSecondPart = this.allSeats.slice(res.seats.length / 2);
        this.trip = res;
        this.city = res.cities.filter(city => city.id === this.cityId)[0];
      });
  }

  public initSeatForm(): void{
    this.seatForm = this.fb.group({
      seats: this.fb.array([])
    });
  }

  public addSeat(seat: SeatDTO, index: number): void {
    this.seats.push(this.fb.group({
      seat: [seat, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required]
    }));
    this.addUserToSeat(seat);
  }


  get seats(): FormArray {
    return this.seatForm.get('seats') as FormArray;
  }

  public removeSeat(index?: number): void {
    const seat = this.allSeats.find(s => s.seatNumber === this.seats.value[index].seat.number);
    seat.addedToCard = false;
    this.summary -= this.city.price;
    this.seats.removeAt(index);
  }

  private getDirection(): void {
    this.bookinService.directionSubject.subscribe(
      res => {
        console.log(res);
        if (res != null) {
          this.direction = res;
        }
      }
    );
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

  private tripValid(date: Date): boolean {
    const currentDate = new Date();
    if (date.getTime() > currentDate.getTime()) {
      return true;
    }
    return false;

  }

  public addUserToSeat(seat: SeatDTO): void {
    this.summary += this.city.price;
    seat.addedToCard = true;

  }

  public buySeats(): void {
    let bookings: Booking[] = [];
    this.initBookings(bookings);
    this.bookinService.bookPlaces(bookings, this.cityId).subscribe(
      res => {
        const seats = this.allSeats.filter(x => this.seats.value.find(s => s.seat.id === x.id) != null);
        seats.forEach(seat => {
          seat.checked = true;
          seat.addedToCard = false;
        });
        this.initSeatForm();
      }
    );
  }

  private initBookings(bookings: Booking[]): void {
    this.seats.value.forEach(seat => {
      const booking = new Booking();
      booking.id = null;
      booking.city = null;
      bookings.push(Object.assign(booking, seat));
    });
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
