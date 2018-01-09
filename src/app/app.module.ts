import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { DonorFormComponent } from './donor-form/donor-form.component';


import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from './routing/routing.module';
import { FormsModule } from '@angular/forms';
import { DonatedItemFormComponent } from './donated-item-form/donated-item-form.component';
import { DataService } from './data.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatusMessageComponent } from './status-message/status-message.component';


@NgModule({
  declarations: [
    AppComponent,

    DonorFormComponent,
    HomeComponent,
    NavigationComponent,
    DonatedItemFormComponent,
    DashboardComponent,
    StatusMessageComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
