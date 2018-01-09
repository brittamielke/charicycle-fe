import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from '../home/home.component';
import { DonatedItemFormComponent } from '../donated-item-form/donated-item-form.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'donatedItem/add', component: DonatedItemFormComponent },
  { path: 'dashboard', component: DashboardComponent}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
