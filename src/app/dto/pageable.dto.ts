import { CityDTO } from "./city.dto";
import { SeatDTO } from "./seat.dto";

export class PagableDTO<T>{
    public id: number;
    public city: CityDTO;
    public seat: SeatDTO;
    public firstName: string;
    public lastName: string;
    public email: string;
}