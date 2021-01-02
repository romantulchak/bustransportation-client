import { Component, OnInit } from '@angular/core';
import { Bus } from '../model/bus.model';
import { Direction } from '../model/direction.model';
import { BusService } from '../service/bus.service';
import { DirectionService } from '../service/direction.service';

@Component({
  selector: 'app-buses',
  templateUrl: './buses.component.html',
  styleUrls: ['./buses.component.scss']
})
export class BusesComponent implements OnInit {
  public buses: Bus[] = [];
  public bus: Bus = new Bus();
  public directions: Direction[] = [];
  public showDirections: boolean = false;
  public currentBusId: number;
  public directionsToAdd: Direction[];
  public directionForBus: Direction[];
  constructor(private busService: BusService, private directionService: DirectionService) { }

  ngOnInit(): void {
    this.getBuses();
    this.getDirections();
  }

  private getBuses(){
    this.busService.getBuses().subscribe(
      res=>{
        if(res != null){
          this.buses = res;
        }
      }
    );
  }
  private getDirections(){
    this.directionService.directions().subscribe(
      res=>{
        if(res != null){
          this.directions = res;
        }
      }
    );
  }
  public createBus(){
    this.busService.createBus(this.bus).subscribe(
      res=>{
        this.buses.push(res);
      },
      error=>{
        console.log(error.error.message);
        
      }
    );
  }
  public addDirectionToArray(direction: Direction){
    if(this.directionsToAdd.includes(direction)){ 
      this.directionsToAdd = this.directionsToAdd.filter(x=> x.id != direction.id);
    }else{
      this.directionsToAdd.push(direction);
    }
  }
  public sendDirections(){
    this.busService.addDirectionsForBus(this.currentBusId, this.directionsToAdd).subscribe(
      res=>{
        console.log("ok");
        
      }
    );
  }
  public checkDirections(bus: Bus, directions: Direction[]){
    console.log(bus.directions);
    if(bus.directions.length == 0){
      this.directionForBus = directions;

    }else{
    this.directionForBus = directions.filter(direction => bus.directions.some(busDirection => direction.id == busDirection.id));
    }
    console.log(this.directionForBus);
    
    this.directionsToAdd = [];
    if(bus.id == this.currentBusId){
      this.showDirections = !this.showDirections;
    }else{
      this.showDirections = true;
    }
    this.currentBusId = bus.id; 
  } 
}