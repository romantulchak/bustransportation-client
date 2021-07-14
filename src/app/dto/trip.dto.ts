import { Bus } from "../model/bus.model";
import { Direction } from "../model/direction.model";
import { Seat } from "../model/seat.model";
import { CityDTO } from "./city.dto";
import { SeatDTO } from "./seat.dto";

export class TripDTO{
    public id: number;
    public dateStart: Date;
    public direction: Direction;
    public bus: Bus;
    public numberOfSeats: number;
    public price: number;
    public seat: Seat[];
    public cities: CityDTO[];
    public departureCity: string;
    public seats: SeatDTO[];
}