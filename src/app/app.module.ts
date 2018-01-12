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
import { AdminformComponent } from './adminform/adminform.component';
import { AgmCoreModule } from '@agm/core';

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
<<<<<<< HEAD
    AdminformComponent
=======
    

>>>>>>> 2c250efd3fd51e81c746be495f190f4df2b662a8

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    FormsModule,
<<<<<<< HEAD
    

=======
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD9Pnb3RyP2NpVrHsQo8VkyZBL48Y2favY'
    })
>>>>>>> 2c250efd3fd51e81c746be495f190f4df2b662a8
  ],
    entryComponents: [DeleteConfirmComponent],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
