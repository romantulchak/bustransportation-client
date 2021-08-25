import {Direction} from '../model/direction.model';
import {TicketDTO} from './ticket.dto';
import {TripDTO} from './trip.dto';

export class CityDTO {
  public id: number;
  public direction: Direction;
  public price: number;
  public trip: TripDTO;
  public dateOfDeparture: Date;
  public isBusStop: boolean;
  public tickets: TicketDTO;
}
