import { SeatDTO } from "./seat.dto";
import { TicketDTO } from "./ticket.dto";

export class BookingDTO{
    public id: number;
    public seat: SeatDTO;
    public tickets: TicketDTO[];
    public totalNumberOfSeats: number;
}
