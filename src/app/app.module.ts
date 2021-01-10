import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusesComponent } from './buses/buses.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DirectionsComponent } from './directions/directions.component';
import { BusCardComponent } from './bus-card/bus-card.component';
import { TripsComponent } from './trips/trips.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    BusesComponent,
    MainComponent,
    DirectionsComponent,
    BusCardComponent,
    TripsComponent,
    NavbarComponent,
    TripDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
