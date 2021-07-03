import { TripDTO } from "./trip.dto";

export class BusDTO{
    public id: number;
    public name: string;
    public brand: string;
    public numberOfSeats: number;
    public trips: TripDTO[];
}