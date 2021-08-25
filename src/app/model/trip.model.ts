import {Bus} from './bus.model';
import {CityStop} from './cityStop.model';
import {Seat} from './seat.model';
import {TripTemplate} from './tripTemplate.model';
import {User} from './user.model';

export class Trip {
  public id: number;
  public bus: Bus;
  public numberOfSeats: number;
  public seats: Seat[];
  public tripTemplates: TripTemplate[];
  public tripType: string;
  public creator: User;
  public stops: CityStop[];

  constructor(id?: number) {
    this.id = id;
  }
}
