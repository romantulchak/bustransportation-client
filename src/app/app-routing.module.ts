import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusesComponent } from './buses/buses.component';
import { DirectionsComponent } from './directions/directions.component';
import { MainComponent } from './main/main.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { TripsComponent } from './trips/trips.component';

const routes: Routes = [
  {path:'', component: MainComponent},
  {path:'buses', component: BusesComponent},
  {path: 'directions', component: DirectionsComponent},
  {path:'trips', component: TripsComponent},
  {path:'trip-details/:id', component:TripDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
