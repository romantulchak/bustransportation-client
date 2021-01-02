import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusesComponent } from './buses/buses.component';
import { DirectionsComponent } from './directions/directions.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path:'', component: MainComponent},
  {path:'buses', component: BusesComponent},
  {path: 'directions', component: DirectionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
