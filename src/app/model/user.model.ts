import { Seat } from "./seat.model";

export class User{
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public seat: Seat;
}