import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking } from '../model/booking.model';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }


  public bookPlaces(bookings: Booking[], cityId: number):Observable<any>{
    return this.http.post<any>(`${API_URL}booking/bookPlaces/${cityId}`, bookings);
  }
}
