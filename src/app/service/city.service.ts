import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CityDTO } from '../dto/city.dto';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  public getCitiesForTrip(tripId: number):Observable<CityDTO[]>{
    return this.http.get<CityDTO[]>(`${API_URL}city/citesForTrip/${tripId}`);
  }

  public getCityTrips(date:string, numberOfSeats: number, directionFrom:string, directionTo:string){
    let params = new HttpParams();
    params = params.append('date', date)
                   .append('numberOfSeats', numberOfSeats.toString())
                   .append('directionFrom', directionFrom)
                   .append('directionTo', directionTo);
    return this.http.get<CityDTO[]>(`${API_URL}city/getCityTrip`, {params: params});   
  }
}
