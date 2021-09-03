import { CityStop } from "../model/cityStop.model";
import { BusDTO } from "./bus.dto";
import { UserDTO } from "./user.dto";

export class TripTemplateDTO{
    public id: number;
    public name: string;
    public bus: BusDTO;
    public user: UserDTO;
    public stops: CityStop[];
    public tripType: string;
}