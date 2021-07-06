import { Bus } from "./bus.model";
import { City } from "./city.model";
import { Direction } from "./direction.model";
import { IntermediatePlaces } from "./intermediatePlaces.model";
import { Seat } from "./seat.model";
import { TripTemplate } from "./tripTemplate.model";
import { User } from "./user.model";

export class Trip{
    public id: number;
    public bus: Bus;
    public numberOfSeats: number;
    public seats: Seat[];
    public tripTemplates: TripTemplate[];
    public tripType: string;
    public creator: User;
    public cities: City[];

    constructor(id?:number){
        this.id = id;
    }
}