import { Directive } from "@angular/core";
import { Trip } from "./trip.model";

export class City{
    public id: number;
    public direction: Directive;
    public price: number;
    public trip: Trip;
    public dateOfDeparture: Date;
    public dateOfArrival: Date;
    public isBusStop: boolean;
}