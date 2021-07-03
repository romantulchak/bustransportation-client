import { Trip } from "./trip.model";


export class Bus{
    public id: number;
    public name: string;
    public brand: string;
    public numberOfSeats: number;
    public trips: Trip[];
}