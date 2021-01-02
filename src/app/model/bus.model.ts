import { Direction } from "./direction.model";


export class Bus{
    public id: number;
    public busName: string;
    public busBrand: string;
    public numberOfSeats: number;
    public directions: Direction[];
}