import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service'

@Component({
  selector: 'app-adminform',
  templateUrl: './adminform.component.html',
  styleUrls: ['./adminform.component.css']
})

export class AdminformComponent implements OnInit {

  private charities;
  private updateCharity = null;
  private donors;
  private updateDonor = null;
  
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  editCharity(charity){
    this.updateCharity = charity;
    console.log(charity);
  }
  
  getCharities() {
    this.dataService.getRecords("charity")
      .subscribe(charityFromAPIS => {
        this.charities = charityFromAPIS;
      })
  }


  submitCharity(charityForm: NgForm) {
    if(!this.updateCharity){
      this.dataService.addRecord("charity", charityForm.value)
        .subscribe(
        charityInfo => {
          this.getCharities();
        });
    }
    else{
      this.dataService.editRecord("charity", charityForm.value, this.updateCharity.id)
        .subscribe(
          charityInfo => {
            this.getCharities();
          }
        )
      this.updateCharity = null;
    }
    charityForm.resetForm();
  }


  deleteCharity(charityId) {
    this.dataService.deleteRecord("charity", charityId)
      .subscribe(
      charityInfo => {
        this.getCharities();
      }
      )
  }
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
        });
    }
    else{
      this.dataService.editRecord("donor", donorForm.value, this.updateDonor.id)
        .subscribe(
          donorInfo => {
            this.getDonors();
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
    this.getCharities();
    this.getDonors();
  }

}
  
  
 

  