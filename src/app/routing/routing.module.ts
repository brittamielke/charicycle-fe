import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonorFormComponent }   from '../donor-form/donor-form.component'; 
import { HomeComponent }   from '../home/home.component';
import { DonatedItemFormComponent } from '../donated-item-form/donated-item-form.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CharityFormComponent } from '../charity-form/charity-form.component';
import { NeededItemFormComponent } from '../needed-item-form/needed-item-form.component';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ClaimItemComponent } from '../claim-item/claim-item.component';
import { ManagecharitiesComponent } from '../managecharities/managecharities.component';
import { ManagedonorsComponent } from '../managedonors/managedonors.component';
import { AdminComponent } from '../admin/admin.component';
import { LoginComponent } from '../login/login.component';
import { ValidateCharityComponent } from '../validate-charity/validate-charity.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'donatedItem/add', component: DonatedItemFormComponent },
  { path: 'dashboard/:type/:id', component: DashboardComponent},
  { path: 'donorForm/add',  component: DonorFormComponent },
  { path: 'charityForm/add', component: CharityFormComponent },
  { path: 'charityForm/add/:id', component: CharityFormComponent },
  { path: 'neededItem/add/:id', component: NeededItemFormComponent },
  { path: 'category', component: CategoryFormComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'manageCharities', component: ManagecharitiesComponent },
  { path: 'manageDonors', component: ManagedonorsComponent },
  { path: 'claimItem/:id/:loggedInUserId', component: ClaimItemComponent },
  { path: 'donatedItem/add/:id', component: DonatedItemFormComponent },
  { path: 'dashboard/donor/:id', component: DashboardComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'manageCharities/validateCharity/:id', component: ValidateCharityComponent }
 ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
