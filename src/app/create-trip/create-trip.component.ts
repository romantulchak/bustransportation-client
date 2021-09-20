import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BusDTO } from '../dto/bus.dto';
import { TripTemplateDTO } from '../dto/trip-template.dto';
import { Bus } from '../model/bus.model';
import { CityStop } from '../model/cityStop.model';
import { TripType } from '../model/enum/tripType.enum';
import { Trip } from '../model/trip.model';
import { TripTemplate } from '../model/tripTemplate.model';
import { BusService } from '../service/bus.service';
import { TripTemplateService } from '../service/trip-template.service';
import { TripService } from '../service/trip.service';

const LOCAL_EN = 'en-US';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss']
})
export class CreateTripComponent implements OnInit {

  public buses: BusDTO[] = [];
  public tripForm: FormGroup;
  public tripType = TripType;
  public currentDate: string;
  public tripTemplates: TripTemplateDTO[];
  public selectedTemplate: TripTemplateDTO;
  private busStopNumber: number = 0;

  constructor(private busService: BusService,
              private formBuilder: FormBuilder,
              private tripService: TripService,
              private tripTemplateService: TripTemplateService) { }

  ngOnInit(): void {
    this.findBusesForUser();
    this.initForm();
    this.setTripAsRegular();
    this.getUserTripTemplates();
  }

  private setTripAsRegular(){
    this.tripForm.valueChanges.subscribe(value =>{
      if(value['tripType'] === this.tripType[this.tripType.REGULAR] && !this.tripForm.get('dateStart') && !this.tripForm.get('dateEnded')){
        const datePipe = new DatePipe(LOCAL_EN);
        this.currentDate = datePipe.transform(new Date(), 'yyyy-MM-dd');
        this.tripForm.addControl('dateStart', new FormControl(this.currentDate, Validators.required));
        this.tripForm.addControl('dateEnded', new FormControl('', Validators.required));
      }
    });
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
    this.stops.value[0].price = 0;
    this.tripService.createTrip(this.getTripFromForm()).subscribe(
      res=>{
        console.log(res);
      }
    );
  }

  private getTripFromForm(): Trip{
    let trip = new Trip();
    return Object.assign(trip, this.tripForm.value);
  }

  private setBusStopNumber(){
    this.stops.value.map(stop => stop.busStopNumber = this.busStopNumber++);
    this.busStopNumber = 0;
  }

  private setTripName(){
    const lastElementIndex = (this.stops.controls.length - 1);
    const name = `${this.getName(0)} - ${this.getName(lastElementIndex)}`;
    this.tripName.setValue(name);
  }
  

  private initForm(bus?: BusDTO, numberOfSeats: number = 0, name?: string, tripType: string = TripType[TripType.IRREGULAR]){
    this.tripForm = this.formBuilder.group({
        bus: [bus, Validators.required],
        numberOfSeats: [numberOfSeats, Validators.required],
        name: [name, Validators.required],
        tripType: [tripType, Validators.required],
        stops: this.formBuilder.array([]),
        tripTemplates: null,
        creator: null
    });
  }

  public addIntermediatePlace(){
    this.stops.push(this.initIntermidiatePlace());
  }

  private initIntermidiatePlace(name?: string, price: number = 0, departure: Date = new Date(), isBusStop: boolean = true, street?: string, busStopNumber?: number): FormGroup{
    return this.formBuilder.group({
      name: [name, Validators.required],
      price: [price, Validators.required],
      departure: [departure, Validators.required],
      isBusStop: [isBusStop, Validators.required],
      street: [street, Validators.required],
      busStopNumber: [busStopNumber, Validators.required]
    })
  }

  public removeIntermediatePlace(index: number): void{
    this.stops.removeAt(index);
  }

  get bus(): Bus{
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

  get getTripType(){
    return this.tripForm.get('tripType').value;
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

  public setDateEnd(date: any){
    this.tripForm.get('dateEnded').setValue(date);
  }

  drop(event: CdkDragDrop<string[]>) {
    if(event.currentIndex === 0){
        this.stops.value[event.previousIndex].price = 0;
    }
    moveItemInArray(this.stops.controls, event.previousIndex, event.currentIndex);
    moveItemInArray(this.stops.value, event.previousIndex, event.currentIndex);
  }

  activeNote: string;
  enter(i) {
    this.activeNote = this.stops.controls[i].get('name').value;
  }

  public saveTemplate(templateName: string){
    let tripTemplate = new TripTemplate(this.bus, this.stops.value, this.getTripType, templateName);
    this.tripTemplateService.createTripTemplate(tripTemplate).subscribe(
      res=>{
        console.log("Ok");
      }
    );
  }

  public getUserTripTemplates(){
    this.tripTemplateService.getTripTempaltesForUser().subscribe(
      res=>{
        this.tripTemplates = res;
      }
    );
  }

  public getStopsForTripTemplate(tripTemplate: TripTemplateDTO){
    this.tripTemplateService.getStopsForTipTemplate(tripTemplate.id).subscribe(
      res=>{
        tripTemplate.stops = res;
        let tripName = `${tripTemplate.stops[0]} - ${tripTemplate.stops[tripTemplate.stops.length-1]}`; 
        let bus = this.buses.find(b => b.id == tripTemplate.bus.id);
        this.initForm(bus, bus.numberOfSeats, tripName, tripTemplate.tripType);
        tripTemplate.stops.forEach(stop =>{
          this.stops.push(this.initIntermidiatePlace(stop.name, stop.price, stop.departure, stop.isBusStop, stop.street, stop.busStopNumber));
        });
        
      }
    );
  }
}
