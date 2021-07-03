import { Bus } from "../model/bus.model";
import { Direction } from "../model/direction.model";
import { Seat } from "../model/seat.model";

export class TripDTO{
    public date: Date;
    public direction: Direction;
    public bus: Bus;
    public numberOfSeats: number;
    public price: number;
    public seat: Seat[];
}