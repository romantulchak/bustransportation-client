import { CityStop } from "../model/cityStop.model";
import { User } from "../model/user.model";

export class TripStatisticDeletedDTO{
    public id: number;
    public name: string;
    public user: User;
    public stops: CityStop[];
    public startDate: Date;
    public endDate: Date;
    public removeDate: Date;
}