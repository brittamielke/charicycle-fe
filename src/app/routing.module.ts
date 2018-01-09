import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharityFormComponent }   from './charity-form/charity-form.component';

const routes: Routes = [
  
  
  { path: 'charity/add', component: CharityFormComponent },
   
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
