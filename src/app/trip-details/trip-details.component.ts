import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CityDTO} from '../dto/city.dto';
import { RouteDTO } from '../dto/route.dto';
import {SeatDTO} from '../dto/seat.dto';
import {TripDTO} from '../dto/trip.dto';
import {Booking} from '../model/booking.model';
import {Direction} from '../model/direction.model';
import {BookingService} from '../service/booking.service';
import { RouteService } from '../service/route.service';

import {TripService} from '../service/trip.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {

  private routeId: number;
  private city: CityDTO;
  public route: RouteDTO;
  public seatFirstPart: SeatDTO[] = [];
  public seatSecondPart: SeatDTO[] = [];
  private direction: Direction;
  public summary: number = 0;
  public success: boolean = false;
  public seatForm: FormGroup;
  public allSeats: SeatDTO[];

  constructor(private router: ActivatedRoute,
              private routeService: RouteService,
              private tripService: TripService,
              private bookinService: BookingService,
              private fb: FormBuilder) {
    router.params.subscribe(
      res => {
        this.routeId = Number.parseInt(res.id);
      }
    );
  }

  ngOnInit(): void {
    this.initSeatForm();
    this.findRouteDetailsById();
    this.getDirection();
  }

  private findRouteDetailsById(){
    this.routeService.getRouteDetailsById(this.routeId).subscribe(
      res=>{
        console.log(res);
        this.allSeats = res.seats;
        this.seatFirstPart = this.allSeats.slice(0, (res.seats.length / 2));
        this.seatSecondPart = this.allSeats.slice(res.seats.length / 2);
        this.route = res.route;
      }
    );
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
    this.bookinService.bookPlaces(bookings, this.routeId).subscribe(
      res => {
        
        const seats = this.allSeats.filter(x => this.seats.value.find(s => s.seat.id === x.id) != null);
        seats.forEach(seat => {
          seat.isBooked = true;
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

}
