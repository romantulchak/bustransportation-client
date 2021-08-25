import {Trip} from './trip.model';

export class City {
  public id: number;
  public price: number;
  public trip: Trip;
  public dateOfArrival: Date;
  public isBusStop: boolean;
  public directionTo: string;
  public directionFrom: string;
}
