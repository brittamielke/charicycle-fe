import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service'

@Component({
  selector: 'app-managecharities',
  templateUrl: './managecharities.component.html',
  styleUrls: ['./managecharities.component.css']
})
export class ManagecharitiesComponent implements OnInit {

  private charities;
  private updateCharity = null;

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
  
  ngOnInit() {
    this.getCharities();
   
  }

 
  
   
}
    

  
  
 

  