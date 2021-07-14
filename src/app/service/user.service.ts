import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { SeatDTO } from "../dto/seat.dto";
import { TripDTO } from "../dto/trip.dto";
import { Seat } from "../model/seat.model";
import { Trip } from "../model/trip.model";

const API_URL = environment.API_URL;
@Injectable({
    providedIn:'root'
})
export class UserService{
    constructor(private httpClient: HttpClient){}

    public addUserToSeat(seats: SeatDTO[], trip: TripDTO):Observable<any>{
        return this.httpClient.post(API_URL + 'user/addUserToSeat/' + trip.id, seats);
    }
}