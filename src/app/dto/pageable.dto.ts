import { CityDTO } from "./city.dto";
import { SeatDTO } from "./seat.dto";

export class PagableDTO<T>{
    public totalPages: number;
    public totalElements: number;
    public currentPage: number;
    public model: T[];
}