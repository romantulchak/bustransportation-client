import { City } from "./city.model";
import { Ticket } from "./ticket.model";
import { User } from "./user.model";

export class Booking{
    public id: number;
    public city: City;
    public user: User;
    public tickets: Ticket[];
}