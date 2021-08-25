import { Bus } from "../model/bus.model";
import { CityStop } from "../model/cityStop.model";
import { Direction } from "../model/direction.model";
import { Route } from "../model/route.model";
import { CityDTO } from "./city.dto";
import { SeatDTO } from "./seat.dto";

export class TripDTO{
    public id: number;
    public dateStart: Date;
    public direction: Direction;
    public bus: Bus;
    public numberOfSeats: number;
    public price: number;
    public name: string;
    public cities: CityDTO[];
    public departureCity: string;
    public seats: SeatDTO[];
    public stops: CityStop[];
    public routes: Route[];
}
