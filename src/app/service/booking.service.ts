import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {BookingDTO} from '../dto/booking.dto';
import {PagableDTO} from '../dto/pageable.dto';
import {Booking} from '../model/booking.model';
import {Direction} from '../model/direction.model';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) {
  }

  public directionSubject: BehaviorSubject<Direction> = new BehaviorSubject(null);

  public bookPlaces(bookings: Booking[], cityId: number): Observable<any> {
    return this.http.post<any>(`${API_URL}booking/bookPlaces/${cityId}`, bookings);
  }

  public getUserTickets(): Observable<PagableDTO<BookingDTO>> {
    let params = new HttpParams();
    params = params.append('page', 0)
      .append('size', 5);
    return this.http.get<PagableDTO<BookingDTO>>(API_URL + 'booking/findUserBooking', {params: params});
  }
}
