import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  

  //TODO: fix animation when drag an item
  public buses: BusDTO[];
  public tripForm: FormGroup;
  public tripType: typeof TripType;
  private busStopNumber: number = 0;

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

  public create(): void{
    this.numberOfSeats = this.bus.numberOfSeats;
    this.setBusStopNumber();
    this.setTripName();
    let trip = new Trip();
    trip = Object.assign(trip, this.tripForm.value);
    this.tripService.createTrip(trip).subscribe(
      res=>{
        console.log(res);
      }
    );
  }

  private setBusStopNumber(){
    this.stops.value.map(stop => stop.busStopNumber = this.busStopNumber++);
    console.log(this.stops.value);
    
  }

  private setTripName(){
    const lastElementIndex = (this.stops.controls.length - 1);
    const name = `${this.getName(0)} - ${this.getName(lastElementIndex)}`;
    this.tripName.setValue(name);
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
      busStopNumber: ['', Validators.required]
    }))
  }

  public removeIntermediatePlace(index: number): void{
    this.stops.removeAt(index);
  }

  get bus(): BusDTO{
    return this.tripForm.get('bus').value;;
  }

  public getName(index: number): string{
    return this.stops.value[index].name;
  }

  get tripName(): AbstractControl{
    return this.tripForm.get('name');
  }

  get price(){
    return this.tripForm.get('price').value;
  }

  public isBusStop(index: number): boolean{
    return this.stops.value[index].isBusStop;
  }

  public getDepartureDate(index: number){
    return this.stops.value[index].departure;
  }

  get stops(): FormArray{
    return this.tripForm.get('stops') as FormArray;
  }

  set numberOfSeats(numberOfSeats: number){
    this.tripForm.get('numberOfSeats').setValue(numberOfSeats);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.stops.controls, event.previousIndex, event.currentIndex);
    moveItemInArray(this.stops.value, event.previousIndex, event.currentIndex);
  }

  activeNote: string;
  enter(i) {
    this.activeNote = this.stops.controls[i].get('name').value;
  }
}
