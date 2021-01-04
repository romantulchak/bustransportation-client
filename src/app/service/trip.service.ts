import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Trip } from "../model/trip.model";

const API_URL = environment.API_URL;
@Injectable({
    providedIn:'root'
})
export class TripService{
    constructor(private http: HttpClient){

    }

    public getTrips():Observable<Trip[]>{
        return this.http.get<Trip[]>(API_URL + 'trip/trips');
    }
    public createTrip(trip:Trip):Observable<Trip>{
        return this.http.post<Trip>(API_URL + 'trip/createTrip', trip);
    }
    public getTripsByDate(date:string, numberOfSeats: number, directionFrom:string, directionTo:string):Observable<Trip[]>{
        let params = new HttpParams();
        params = params.append('date', date).append('numberOfSeats', numberOfSeats.toString()).append('directionFrom', directionFrom).append('directionTo', directionTo);
        return this.http.get<Trip[]>(API_URL + 'trip/tripsByDate', {params: params});
    }
}