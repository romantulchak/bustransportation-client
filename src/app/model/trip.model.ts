import { Bus } from "./bus.model";
import { Direction } from "./direction.model";
import { IntermediatePlaces } from "./intermediatePlaces.model";
import { Seat } from "./seat.model";
import { TripTemplate } from "./tripTemplate.model";

export class Trip{
    public id: number;
    public date: Date;
    public direction: Direction;
    public bus: Bus;
    public numberOfSeats: number;
    public seats: Seat[];
    public intermediatePlaces: IntermediatePlaces[];
    public price: number;
    public tripTemplates: TripTemplate[];
    public tripType: string;

    constructor(id?:number){
        this.id = id;
    }
}