import { City } from "./city.model";
import { Seat } from "./seat.model";

export class Booking{
    public id: number;
    public city: City;
    public seat: Seat;
    public firstName: string;
    public lastName: string;
    public email: string;
}