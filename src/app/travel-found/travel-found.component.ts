import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CityDTO} from '../dto/city.dto';
import {Direction} from '../model/direction.model';
import {BookingService} from '../service/booking.service';
import {CityService} from '../service/city.service';

@Component({
  selector: 'app-travel-found',
  templateUrl: './travel-found.component.html',
  styleUrls: ['./travel-found.component.scss']
})
export class TravelFoundComponent implements OnInit {

  public trips: CityDTO[];

  constructor(private cityService: CityService,
              private bookingService: BookingService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getFoundTrips();
  }

  public getFoundTrips() {
    this.cityService.trips.subscribe(
      res => {
        this.trips = res;
        if (res === null || res === undefined) {
          this.router.navigateByUrl('/');
        }
      }
    );
  }

  public sendDirection(directionFrom: string, directionTo: string, distance: number) {
    const direction = new Direction();
    direction.directionFrom = directionFrom;
    direction.directionTo = directionTo;
    direction.distance = distance;
    this.bookingService.directionSubject.next(direction);
  }
}
