import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service'
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-managedonors',
  templateUrl: './managedonors.component.html',
  styleUrls: ['./managedonors.component.css']
})
export class ManagedonorsComponent implements OnInit {

  private donors;
  private updateDonor = null;
  successMessage: string;
  errorMessage: string;
   
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  editDonor(donor){
    this.updateDonor = donor;
    console.log(donor);
  }
  
  getDonors() {
    this.dataService.getRecords("donor")
      .subscribe(donorFromAPIS => {
        this.donors = donorFromAPIS;
      })
  }

  submitDonor(donorForm: NgForm) {
    console.log(donorForm.value);
    if(!this.updateDonor){
      this.dataService.addRecord("donor", donorForm.value)
        .subscribe(
        donorInfo => {
          this.getDonors();
          this.successMessage = "Donor Added Successfully";
        },
        error => {
          this.errorMessage = <any>error;
        });
      donorForm.resetForm();
    }
    else{
      this.dataService.editRecord("donor", donorForm.value, this.updateDonor.id)
        .subscribe(
        charityInfo => {
          this.successMessage = "Donor Updated Successfully"
          this.getDonors();
        },
        error => {
          this.errorMessage = <any>error;
        }
        )
      this.updateDonor = null;
    }
    donorForm.resetForm();
  }


  deleteDonor(donorId) {
    this.dataService.deleteRecord("donor", donorId)
      .subscribe(
      donorInfo => {
        this.getDonors();
      }
      )
  }
  
  ngOnInit() {
    this.getDonors();
  }

}
  
  
 

  