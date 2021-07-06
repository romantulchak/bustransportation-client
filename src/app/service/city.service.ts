import { HttpClient } from '@angular/common/http';
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
}
