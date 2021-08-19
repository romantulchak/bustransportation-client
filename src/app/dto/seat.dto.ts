import { Ticket } from "../model/ticket.model";
import { TicketDTO } from "./ticket.dto";
import { UserDTO } from "./user.dto";

export class SeatDTO{
    public id: number;
    public seatNumber: number;
    public users: UserDTO[];
    public checked?:boolean = false;
    public addedToCard: boolean = false;
    public tickets: TicketDTO[];
}