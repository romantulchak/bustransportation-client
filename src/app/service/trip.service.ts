import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PageableDTO } from "../dto/pageable.dto";
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


    public restoreTripSubject: BehaviorSubject<TripDTO> = new BehaviorSubject(null);

    constructor(private http: HttpClient){
    }

    public getTrips():Observable<TripDTO[]>{
        return this.http.get<TripDTO[]>(API_URL + 'trip/trips');
    }
    public createTrip(trip:Trip):Observable<TripDTO>{
        return this.http.post<TripDTO>(API_URL + 'trip/createTrip', trip);
    }

    public getTripsForUser(page: number):Observable<PageableDTO<TripDTO>>{
        return this.http.get<PageableDTO<TripDTO>>(`${API_URL}trip/tripsForUser/${page}`);
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

    public getPreDeletedTrips(page: number): Observable<PageableDTO<TripDTO>>{
        return this.http.get<PageableDTO<TripDTO>>(`${API_URL}trip/pre-deleted-trips/${page}`);
    }
    
    public fullDeleteTrip(id: number):Observable<any>{
        return this.http.delete(`${API_URL}trip/full-delete/${id}`);
    }
    
    public getCountPreDeletedTrips():Observable<number>{
        return this.http.get<number>(API_URL + 'trip/count-pre-deleted-trips');
    }

    public restoreTrip(id: number): Observable<TripDTO>{
        return this.http.put<TripDTO>(`${API_URL}trip/restore-trip/${id}`, null);
    }
}