import { Trip } from "./trip.model";


export class Bus{
    public id: number;
    public busName: string;
    public busBrand: string;
    public numberOfSeats: number;
    public trips: Trip[];
}