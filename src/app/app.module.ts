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
import { TripCityLineComponent } from './trip-city-line/trip-city-line.component';
import { HeaderComponent } from './header/header.component';
import {DpDatePickerModule} from 'ng2-date-picker';
import { TravelFoundComponent } from './travel-found/travel-found.component';
import { TicketsComponent } from './tickets/tickets.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { TripCardComponent } from './trip-card/trip-card.component';
import { RemovedTripsDialogComponent } from './removed-trips-dialog/removed-trips-dialog.component';
import { PaginationComponent } from './pagination/pagination.component';
import { BreadcrumbMenuComponent } from './breadcrumb-menu/breadcrumb-menu.component';
import { DeleteTripsStatisticComponent } from './delete-trips-statistic/delete-trips-statistic.component';
import { UserTripsMenuComponent } from './user-trips-menu/user-trips-menu.component';

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
    UserTripsComponent,
    TripCityLineComponent,
    HeaderComponent,
    TravelFoundComponent,
    TicketsComponent,
    ActivateAccountComponent,
    TripCardComponent,
    RemovedTripsDialogComponent,
    PaginationComponent,
    BreadcrumbMenuComponent,
    DeleteTripsStatisticComponent,
    UserTripsMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule,
    DragDropModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
