import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../request/login.request';
import { RegistrationRequest } from '../request/registration.request';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(loginRequest: LoginRequest):Observable<any>{
    return this.http.post(API_URL + 'auth/login', loginRequest);
  }
  
  public register(registrationRequest: RegistrationRequest):Observable<any>{
    return this.http.post(API_URL + 'auth/registration', registrationRequest);
  }

}
