import { Direction } from "./direction.model";
import { User } from "./user.model";

export class Seat{
    public id: number;
    public seatNumber: number;
    public direction: Direction;
    public user: User;
}