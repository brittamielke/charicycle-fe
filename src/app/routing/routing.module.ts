import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DonorFormComponent }   from '../donor-form/donor-form.component'; 
import { HomeComponent }   from '../home/home.component';
import { DonatedItemFormComponent } from '../donated-item-form/donated-item-form.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CharityFormComponent } from '../charity-form/charity-form.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { AboutUsComponent } from '../about-us/about-us.component';

 
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'donatedItem/add', component: DonatedItemFormComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'donor',  component: DonorFormComponent },
  { path: 'charityForm/add', component: CharityFormComponent},
  {path: 'contactUs', component: ContactUsComponent},
  {path: 'aboutUs', component: AboutUsComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
