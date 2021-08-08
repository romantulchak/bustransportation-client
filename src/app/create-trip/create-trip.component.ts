import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BusDTO } from '../dto/bus.dto';
import { TripType } from '../model/enum/tripType.enum';
import { Trip } from '../model/trip.model';
import { BusService } from '../service/bus.service';
import { TripService } from '../service/trip.service';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss']
})
export class CreateTripComponent implements OnInit {
  
  public buses: BusDTO[];
  public tripForm: FormGroup;
  public tripType: typeof TripType;

  constructor(private busService: BusService,
              private formBuilder: FormBuilder,
              private tripService: TripService) { }

  ngOnInit(): void {
    this.findBusesForUser();
    this.initForm();
  }

  private findBusesForUser(){
    this.busService.getBusesForUser().subscribe(
      res=>{
        this.buses = res;        
      }
    );
  }

  public create(){
    this.numberOfSeats = this.bus.numberOfSeats;
    let trip = new Trip();
    trip = Object.assign(trip, this.tripForm.value);
    this.tripService.createTrip(trip).subscribe(
      res=>{
        console.log(res);
      }
    );
  }

  private initForm(){
    this.tripForm = this.formBuilder.group({
        bus: [null, Validators.required],
        numberOfSeats: [0, Validators.required],
        name: ['', Validators.required],
        dateStart: ['', Validators.required],
        departureCity: ['', Validators.required],
        tripType: [TripType[TripType.REGULAR], Validators.required],
        cities: this.formBuilder.array([]),
        tripTemplates: null,
        creator: null
    });
  }

  public addIntermediatePlace(){
    this.cities.push(this.formBuilder.group({
      direction: this.formBuilder.group({
        directionFrom: [this.tripForm.get('departureCity').value, Validators.required],
        directionTo: ['', Validators.required],
        distance: [0, Validators.required]
      }),
      price: [0, Validators.required],
      dateOfDeparture: [this.tripForm.get('dateStart').value, Validators.required],
      dateOfArrival: [new Date(), Validators.required],
      isBusStop: [true, Validators.required],
      street: ['', Validators.required],
      fromMainCity: ['', Validators.required]
    }))
  }

  public removeIntermediatePlace(index: number){
    this.cities.removeAt(index);
  }

  get bus(){
    return this.tripForm.get('bus').value;;
  }

  get directionFrom(){
    return this.tripForm.get('directionFrom').value;
  }

  get directionTo(){
    return this.tripForm.get('directionTo').value;
  }

  get price(){
    return this.tripForm.get('price').value;
  }

  get cities(): FormArray{
    return this.tripForm.get('cities') as FormArray;
  }

  get direction(){
    return this.tripForm.get('direction').value;
  }

  set numberOfSeats(numberOfSeats: number){
    this.tripForm.get('numberOfSeats').setValue(numberOfSeats);
  }
}
