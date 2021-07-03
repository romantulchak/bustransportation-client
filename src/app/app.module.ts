import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusesComponent } from './buses/buses.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BusCardComponent } from './bus-card/bus-card.component';
import { TripsComponent } from './trips/trips.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authInterceptorProviders } from './helper/auth.interceptor';
import { NavComponent } from './nav/nav.component';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { ProfileComponent } from './profile/profile.component';
import { UserTripsComponent } from './user-trips/user-trips.component';
@NgModule({
  declarations: [
    AppComponent,
    BusesComponent,
    MainComponent,
    BusCardComponent,
    TripsComponent,
    TripDetailsComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    CreateTripComponent,
    ProfileComponent,
    UserTripsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
