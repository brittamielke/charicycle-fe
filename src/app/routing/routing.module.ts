import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonatedItemFormComponent } from '../donated-item-form/donated-item-form.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'donatedItem/add', component: DonatedItemFormComponent },
    { path: 'home', component: DashboardComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }