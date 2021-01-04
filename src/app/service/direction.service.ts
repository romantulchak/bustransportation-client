import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Direction } from "../model/direction.model";

const API_URL = environment.API_URL;

@Injectable({
    providedIn:'root'
})
export class DirectionService{
    constructor(private http: HttpClient){}

    public getDirections():Observable<Direction[]>{
        return this.http.get<Direction[]>(API_URL + 'direction/directions');
    }
    public createDirection(direction: Direction):Observable<Direction>{
        return this.http.post<Direction>(API_URL + 'direction/createDirection', direction);
    }
}