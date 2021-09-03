import { Bus } from "./bus.model";
import { CityStop } from "./cityStop.model";
import { User } from "./user.model";

export class TripTemplate{
    public id: number;
    public name: string;
    public bus: Bus;
    public stops: CityStop[];
    public tripType: string;
    public user: User;

    constructor(bus: Bus, stops: CityStop[], tripType: string, name: string){
        this.bus = bus;
        this.stops = stops;
        this.tripType = tripType;
        this.name = name;
    }
}