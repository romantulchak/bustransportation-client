import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { BusesComponent } from './buses/buses.component';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { DeleteTripsStatisticComponent } from './delete-trips-statistic/delete-trips-statistic.component';
import { ProfileGuard } from './guard/profile.guard';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TravelFoundComponent } from './travel-found/travel-found.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { TripsComponent } from './trips/trips.component';
import { UserTripsMenuComponent } from './user-trips-menu/user-trips-menu.component';
import { UserTripsComponent } from './user-trips/user-trips.component';

const routes: Routes = [
  {path:'', component: MainComponent},
  {path:'buses', component: BusesComponent},
  {path: 'profile', data:{breadcrumb:"Profile"}, canActivate: [ProfileGuard], children:[
      {path: '', component: ProfileComponent},
      {path: 'tickets', data:{breadcrumb: "Tickets"}, children:[
        {path:'', data:{breadcrumb: null}, component:TicketsComponent}
      ]},
      {path: 'trip', data:{breadcrumb: null}, component: TripsComponent, children:[
        {path: 'create-trip', data:{breadcrumb: "Create Trip"}, component: CreateTripComponent},
        {path: 'trips', data:{breadcrumb: "Trips"}, component: TripsComponent},
        {path: 'details/:id', data:{breadcrumb: "Trip Details"}, component:TripDetailsComponent},
        {path: 'user-trips', data:{breadcrumb: "Trips Menu"}, children:[
          {path: '', data:{breadcrumb: null}, component: UserTripsMenuComponent},
          {path: 'my-trips', data: {breadcrumb: "My Trips"}, component: UserTripsComponent},
          {path: 'deleted-trips', data: {breadcrumb: "Delete trips statistic"}, component: DeleteTripsStatisticComponent}
        ]}
      ]},
  ]},
  {path: 'trips-found', component: TravelFoundComponent},
 
  {path: 'register/verify', component: ActivateAccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
