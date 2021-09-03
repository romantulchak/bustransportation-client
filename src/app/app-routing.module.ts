import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { BusesComponent } from './buses/buses.component';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { LoginRegisterGuard } from './guard/login-register.guard';
import { ProfileGuard } from './guard/profile.guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TravelFoundComponent } from './travel-found/travel-found.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { TripsComponent } from './trips/trips.component';
import { UserTripsComponent } from './user-trips/user-trips.component';

const routes: Routes = [
  {path:'', component: MainComponent},
  {path:'buses', component: BusesComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard]},
  {path: 'trips-found', component: TravelFoundComponent},
  {path: 'trip', children:[
    {path: 'create-trip', component: CreateTripComponent},
    {path: 'trips', component: TripsComponent},
    {path: 'details/:id', component:TripDetailsComponent},
    {path: 'user-trips', component: UserTripsComponent}
  ]},
  {path: 'tickets', component:TicketsComponent},
  {path: 'register/verify', component: ActivateAccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
