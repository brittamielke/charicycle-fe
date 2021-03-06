import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { StatusMessageComponent } from './status-message/status-message.component';
import { CharityFormComponent } from './charity-form/charity-form.component';
import { DonorFormComponent } from './donor-form/donor-form.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DonatedItemFormComponent } from './donated-item-form/donated-item-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from'./routing/routing.module';
import { NeededItemFormComponent } from './needed-item-form/needed-item-form.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ClaimItemComponent } from './claim-item/claim-item.component';
import { AgmCoreModule } from '@agm/core';
import { ManagecharitiesComponent } from './managecharities/managecharities.component';
import { ManagedonorsComponent } from './managedonors/managedonors.component';
import { AdminComponent } from './admin/admin.component';
import { MatDialogModule } from '@angular/material';
import { DataTablesModule } from 'angular-datatables';
import { DistanceDataService } from './google-distance.service';
import { DonatedItemTableComponent } from './donated-item-table/donated-item-table.component';
import { LoginComponent } from './login/login.component';
import { CharityInfoService } from './charity-navigator.service';
import { ValidateCharityComponent } from './validate-charity/validate-charity.component';
import { ClaimedItemTableComponent } from './claimed-item-table/claimed-item-table.component';
import { DonorNeededItemTableComponent } from './donor-needed-item-table/donor-needed-item-table.component';



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
    StatusMessageComponent,
    NeededItemFormComponent,
    CategoryFormComponent,
    ContactUsComponent,
    AboutUsComponent,
    ClaimItemComponent,
    ManagecharitiesComponent,
    ManagedonorsComponent,
    AdminComponent,
    DonatedItemTableComponent,
    LoginComponent,
    ValidateCharityComponent,
    ClaimedItemTableComponent,
    DonorNeededItemTableComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD9Pnb3RyP2NpVrHsQo8VkyZBL48Y2favY'
    }),
    DataTablesModule
  ],
    entryComponents: [DeleteConfirmComponent],
  providers: [
    DataService,
    DistanceDataService,
    CharityInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
