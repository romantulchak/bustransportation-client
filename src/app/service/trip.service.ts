import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TripDTO } from "../dto/trip.dto";
import { Trip } from "../model/trip.model";

const API_URL = environment.API_URL;
@Injectable({
    providedIn:'root'
})
export class TripService{
    constructor(private http: HttpClient){

    }

    public getTrips():Observable<TripDTO[]>{
        return this.http.get<TripDTO[]>(API_URL + 'trip/trips');
    }
    public createTrip(trip:Trip):Observable<TripDTO>{
        return this.http.post<TripDTO>(API_URL + 'trip/createTrip', trip);
    }

    public getTripsForUser():Observable<TripDTO[]>{
        return this.http.get<TripDTO[]>(API_URL + 'trip/tripsForUser');
    }

    public getTripById(id: number):Observable<Trip>{
        return this.http.get<Trip>(API_URL + 'trip/tripById/'+id);
    }

    public findTripByCityId(cityId: number): Observable<TripDTO>{
        return this.http.get<TripDTO>(`${API_URL}trip/getTripByCity/${cityId}`);
    }
}