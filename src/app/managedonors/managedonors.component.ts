import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service'
import { Component, OnInit, ViewChild } from '@angular/core';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-managedonors',
  templateUrl: './managedonors.component.html',
  styleUrls: ['./managedonors.component.css']
})
export class ManagedonorsComponent implements OnInit {

  private donors;
  successMessage: string;
  errorMessage: string;
   
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog
  ) {}

  
  getDonors() {
    this.dataService.getRecords("donor")
      .subscribe(donorFromAPIS => {
        this.donors = donorFromAPIS;
      })
  }


  deleteDonor(donorId) {
    let deleteMessage;
      deleteMessage = `This will delete the donor`;
    let dialogRef = this.dialog.open(DeleteConfirmComponent, { data: deleteMessage });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteRecord("donor", donorId)
          .subscribe(
          donorInfo => {
            this.getDonors();
          },
          error => {
            this.errorMessage = <any>error;
          }
          )

      }
    })
  }
  
  ngOnInit() {
    this.getDonors();
  }

}
  
  
 

  