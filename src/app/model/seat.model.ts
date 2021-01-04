import { Direction } from "./direction.model";
import { Trip } from "./trip.model";
import { User } from "./user.model";

export class Seat{
    public id: number;
    public seatNumber: number;
    public user: User;  
    public trip: Trip;
}