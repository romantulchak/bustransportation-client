import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PagableDTO } from "../dto/pageable.dto";
import { TripDTO } from "../dto/trip.dto";
import { CityStop } from "../model/cityStop.model";
import { Route } from "../model/route.model";
import { Trip } from "../model/trip.model";
import { TripTemplate } from "../model/tripTemplate.model";

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

    public getTripsForUser(page: number):Observable<PagableDTO<TripDTO[]>>{
        return this.http.get<PagableDTO<TripDTO[]>>(`${API_URL}trip/tripsForUser/${page}`);
    }

    public getTripById(id: number):Observable<Trip>{
        return this.http.get<Trip>(API_URL + 'trip/tripById/'+id);
    }

    public findTripByCityId(cityId: number): Observable<TripDTO>{
        return this.http.get<TripDTO>(`${API_URL}trip/getTripByCity/${cityId}`);
    }

    public getTripStopsByTripId(id: number): Observable<CityStop[]>{
        return this.http.get<CityStop[]>(`${API_URL}trip/trip-stops/${id}`);
    }

    public preDeleteTrip(id: number):Observable<any>{
        return this.http.put(`${API_URL}trip/pre-delete/${id}`, null);
    }
}