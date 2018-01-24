import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { MatDialog, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-managecharities',
  templateUrl: './managecharities.component.html',
  styleUrls: ['./managecharities.component.css']
})
export class ManagecharitiesComponent implements OnInit {

  private charities;
  successMessage: string;
  errorMessage: string;


  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog
  ) {}
    
  
  getCharities() {
    this.dataService.getRecords("charity")
      .subscribe(charityFromAPIS => {
        this.charities = charityFromAPIS;
      })
  }



  confirmCharity(charity) {
    charity["confirmed"] = true;
    this.dataService.editRecord("charity", charity, charity.id)
      .subscribe(
      charityInfo => {
        this.successMessage = "Charity Confirmed!"
        this.getCharities();
      },
      error => {
        this.errorMessage = <any>error;
      }
      )
  }


  deleteCharity(charity) {
    let deleteMessage;
    if(charity.confirmed){
      deleteMessage = `This will delete charity with name of "${charity.companyName}", including all needed and claimed items`;
    } else {
      deleteMessage = `This will deny charity "${charity.companyName}", and delete all data entered`;
    }
    let dialogRef = this.dialog.open(DeleteConfirmComponent, { data: deleteMessage });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      this.dataService.deleteRecord("charity", charity.id)
        .subscribe(
        charityInfo => {
          this.getCharities();
        },
        error => {
          this.errorMessage = <any>error;
        }
        )
      
      }
    })
  
  }
  
  ngOnInit() {
    this.getCharities();
   
  }
}