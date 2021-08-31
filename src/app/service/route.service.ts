import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { RouteDTO } from "../dto/route.dto";

const API_URL = environment.API_URL;

@Injectable({
    providedIn:'root'
})
export class RouteService{
    constructor(private http: HttpClient){}

    public routes: BehaviorSubject<RouteDTO[]> = new BehaviorSubject(null);


    public getRoutesByDirectionAndDate(from: string, to: string, date: string, numberOfSeats: number):Observable<RouteDTO[]>{
        let params = new HttpParams();
        params = params.append('from', from)
                        .append('to', to)
                        .append('date', date)
                        .append('numberOfSeats', numberOfSeats.toString());
        return this.http.get<RouteDTO[]>(`${API_URL}route/getRoutesByDirectionAndDate`, {params: params});
    }

    public getRouteDetailsById(id: number): Observable<any>{
        return this.http.get(`${API_URL}route/details/${id}`);
    }
}