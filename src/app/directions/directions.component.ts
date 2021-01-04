import { Component, OnInit } from '@angular/core';
import { Direction } from '../model/direction.model';
import { DirectionService } from '../service/direction.service';

@Component({
  selector: 'app-directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.scss']
})
export class DirectionsComponent implements OnInit {
  public directions: Direction[] = [];
  public direction: Direction = new Direction();
  constructor(private directionService: DirectionService) { }

  ngOnInit(): void {
    this.getDirections();
  }

  private getDirections(){
    this.directionService.getDirections().subscribe(
      res=>{
        if(res != null){
          this.directions = res;
        }
    }
    );
  }
  public createDirection(){
    this.direction.direction = this.direction.directionFrom + " - " + this.direction.directionTo;
    this.directionService.createDirection(this.direction).subscribe(
      res=>{
        if(res != null){
          this.directions.push(res);
        }
      }
    );
  }
}
