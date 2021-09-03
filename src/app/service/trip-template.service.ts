import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TripTemplateDTO } from '../dto/trip-template.dto';
import { CityStop } from '../model/cityStop.model';
import { TripTemplate } from '../model/tripTemplate.model';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class TripTemplateService {

  constructor(private http: HttpClient) { }

  public createTripTemplate(tripTemplate: TripTemplate): Observable<any>{
    return this.http.post<any>(API_URL + 'trip-template/create', tripTemplate);
  }

  public getTripTempaltesForUser(): Observable<TripTemplateDTO[]>{
    return this.http.get<TripTemplateDTO[]>(API_URL + 'trip-template/user-templates')
  }

  public getStopsForTipTemplate(id: number):Observable<CityStop[]>{
    return this.http.get<CityStop[]>(`${API_URL}trip-template/template-stops/${id}`);
  }
  
}
