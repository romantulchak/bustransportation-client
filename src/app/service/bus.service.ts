import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Bus } from "../model/bus.model";
import { retry } from 'rxjs/operators';
import { Direction } from "../model/direction.model";
import { BusDTO } from "../dto/bus.dto";

const API_URL = environment.API_URL;
@Injectable({
    providedIn:'root'
})
export class BusService{
    constructor(private http:HttpClient){}

    public createBus(bus: Bus):Observable<BusDTO>{
        return this.http.post<BusDTO>(API_URL + 'bus/createBus', bus).pipe(
            retry(15)
        );
    }

    public getBuses():Observable<Bus[]>{
        return this.http.get<Bus[]>(API_URL + 'bus/buses').pipe(
            retry(15)
        )
    }
    public addDirectionsForBus(busId:number, directions: Direction[]):Observable<any>{
        return this.http.put(API_URL + 'bus/addDirection/'+busId, directions);
    }
    
    public getBusesForUser():Observable<BusDTO[]>{
        return this.http.get<BusDTO[]>(`${API_URL}bus/findBusesForUser`);
    }
}