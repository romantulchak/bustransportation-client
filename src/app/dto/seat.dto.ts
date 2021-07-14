import { UserDTO } from "./user.dto";

export class SeatDTO{
    public id: number;
    public seatNumber: number;
    public users: UserDTO[];
    public checked?:boolean = false;
    public addedToCard: boolean = false;
}