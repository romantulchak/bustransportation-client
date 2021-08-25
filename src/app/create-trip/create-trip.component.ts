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
        tripType: [TripType[TripType.REGULAR], Validators.required],
        stops: this.formBuilder.array([]),
        tripTemplates: null,
        creator: null
    });
  }

  public addIntermediatePlace(){
    this.stops.push(this.formBuilder.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      departure: [new Date(), Validators.required],
      isBusStop: [true, Validators.required],
      street: ['', Validators.required],
    }))
  }

  public removeIntermediatePlace(index: number): void{
    this.stops.removeAt(index);
  }

  get bus(): BusDTO{
    return this.tripForm.get('bus').value;;
  }

  public name(index: number): string{
    return this.stops.value[index].name;
  }

  get price(){
    return this.tripForm.get('price').value;
  }

  public isBusStop(index: number): boolean{
    return this.stops.value[index].isBusStop;
  }

  get stops(): FormArray{
    return this.tripForm.get('stops') as FormArray;
  }

  set numberOfSeats(numberOfSeats: number){
    this.tripForm.get('numberOfSeats').setValue(numberOfSeats);
  }
}
