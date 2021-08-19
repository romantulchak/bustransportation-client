import { Booking } from "./booking.model";
import { Seat } from "./seat.model";

export class Ticket{
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public seat: Seat;
    public booking: Booking;
}