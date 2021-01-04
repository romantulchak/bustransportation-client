import { Bus } from "./bus.model";
import { Direction } from "./direction.model";
import { Seat } from "./seat.model";

export class Trip{
    public id: number;
    public date: Date;
    public direction: Direction;
    public bus: Bus;
    public numberOfSeats: number;
    public seats: Seat[];
    
    public price: number;
}