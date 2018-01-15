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

  id: number;

  constructor( 
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params
    .subscribe((params: Params) =>{
      (+params['id']) ? this.id = +params['id']: null;
  });
}

  saveCharity(charityForm: NgForm){
    console.log(charityForm.value);
      this.dataService.addRecord("charity", charityForm.value) 
          .subscribe(
            result => this.successMessage = "Record updated successfully",
            error =>  this.errorMessage = <any>error);
            this.charityForm.form.markAsPristine();
   
    }
    deleteCharity(charityForm: NgForm){
      console.log(charityForm.value);
        this.dataService.deleteRecord("charity", charityForm.value) 
            .subscribe(
              result => this.successMessage = "Record deleted successfully",
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
  
    formErrors = {
    'comapnyName': '',
    'contactFirstName': '',
    'contactLastName': '',
    'taxId': '',
    'userName': '',
    'password': '',
    'addressLine': '',
    'city': '',
    'state': '',
    'zip': '',
    'email': '',
    'phoneNumber' : ''

    };
  
    validationMessages = {
      'companyName': {
        'required': 'Organization Name is required.',
        'minlength': 'Company name must be at least 2 characters long.',
        'maxlength': 'Company name cannot be more than 30 characters long.'
      },
      'contactFirstName': {
        'required': 'First name is required.',
        'minlength': 'First name must be at least 2 characters long.',
        'maxlength': 'First name cannot be more than 30 characters long.'
      },
      'userName': {
        'required': 'User name is required.',
        'minlength': 'User name must be at least 2 characters long.'
      },
      'password': {
        'required': 'Password is required.',
        'minlength': 'Password must be at least 6 characters long.'
      },
      'contactLastName': {
        'required': 'Last name is required.',
        'minlength': 'Last name must be at least 2 characters long.',
        'maxlength': 'Last name cannot be more than 30 characters long.'
      },
      'addressLine': {
        'minlength': 'The Address Line must be at least 2 characters long.',
        'maxlength': 'The Address Line cannot be more than 50 characters long.'
      },
      'city': {
        'minlength': 'The City must be at least 2 characters long.',
        'maxlength': 'The City cannot be more than 30 characters long.'
      },
      'state': {
        'minlength': 'The State must be at least 2 characters long.',
        'maxlength': 'The State cannot be more than 30 characters long.'
      },
      'zip': {
        'pattern': 'The Zipcode must be a number'
      },
      'phoneNumber': {
        'pattern': 'Please enter a phone number in the following format: (317)-222-5555'
      },
      'email': {
        'pattern': 'Please enter an email address'
      }
    };
  
  }
  



