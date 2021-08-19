import { Seat } from "../model/seat.model";

export class BookingRequest{
    public firstName: string;
    public lastName: string;
    public email: string;
    public seat: Seat;
}