import { BookingDTO } from "./booking.dto";
import { SeatDTO } from "./seat.dto";

export class TicketDTO{
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public seat: SeatDTO;
    public booking: BookingDTO;
}