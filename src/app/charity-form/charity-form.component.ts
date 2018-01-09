import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service'

@Component({
  selector: 'app-charity-form',
  templateUrl: './charity-form.component.html',
  styleUrls: ['./charity-form.component.css']
})
export class CharityFormComponent implements OnInit {

  charityForm:  NgForm;
  @ViewChild('charityForm')
  currentForm:  NgForm;

  successMessage: string;
  errorMessage: string;

  Id: number;

  constructor( 
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params
    .subscribe((params: Params) =>{
      (+params['id']) ? this.Id = +params['id']: null;
  });
}

  saveCharity(charityForm: NgForm){
    console.log(charityForm.value);
      this.dataService.addRecord("charity/charityForm", charityForm.value) 
          .subscribe(
            result => this.successMessage = "Record updated successfully",
            error =>  this.errorMessage = <any>error);
            this.charityForm.form.markAsPristine();
   
    }
    ngAfterViewChecked() {
      this.formChanged();
    }
  
    formChanged() {
      this.charityForm = this.currentForm;
      this.charityForm.valueChanges
        .subscribe(
          data => this.onValueChanged()
        );
    }
  
    onValueChanged() {
      let form = this.charityForm.form;
  
      for (let field in this.formErrors) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
  
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  
    formErrors = {};
  
    validationMessages = {};
  
  }
  



