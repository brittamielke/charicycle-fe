

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




@NgModule({
  declarations: [
    AppComponent,
    DeleteConfirmComponent,
    StatusMessageComponent,  
    CharityFormComponent,
        
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    HttpModule,
    FormsModule
   
  ],
  entryComponents: [DeleteConfirmComponent],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
