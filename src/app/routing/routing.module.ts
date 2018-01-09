import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DonorFormComponent }   from '../donor-form/donor-form.component';


const routes: Routes = [
  
  { path: 'donor',  component: DonorFormComponent }
 
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
