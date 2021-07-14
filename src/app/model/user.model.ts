import { Seat } from "./seat.model";

export class User{
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public seats: Seat[];

    constructor(){
        this.firstName = "";
        this.lastName = "";
        this.email = "";
    }
}