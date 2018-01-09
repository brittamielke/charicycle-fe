

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { MatDialogModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing.module';
import { DataService } from './data.service';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { StatusMessageComponent } from './status-message/status-message.component';
import { CharityFormComponent } from './charity-form/charity-form.component';

import { DonorFormComponent } from './donor-form/donor-form.component';


import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from './routing/routing.module';
import { FormsModule } from '@angular/forms';
import { DonatedItemFormComponent } from './donated-item-form/donated-item-form.component';
import { DataService } from './data.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatusMessageComponent } from './status-message/status-message.component'


@NgModule({
  declarations: [
    AppComponent,
    DeleteConfirmComponent,
    StatusMessageComponent,  
    CharityFormComponent,     
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

    MatDialogModule,
    HttpModule,
    BrowserAnimationsModule,
    FormsModule
  ],
    entryComponents: [DeleteConfirmComponent],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
