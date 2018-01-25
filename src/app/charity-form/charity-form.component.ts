import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

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
  charity;

  constructor( 
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location, private router: Router
  ) {}

  ngOnInit() {
    this.route.params
    .subscribe((params: Params) =>{
      (+params['id']) ? this.id = +params['id']: null;
  });
  if(this.id){
  this.getCharity();
  }
}

  getCharity() {
    this.dataService.getRecords("charity/" + this.id)
      .subscribe(
      result => {
        this.charity = result;
        this.charity["taxId"] = result["taxId"].replace("-", "");
        console.log(result);
      },
      error => this.errorMessage = <any>error);

  }
  saveCharity(charityForm: NgForm){
    console.log(charityForm.value);
    if (!this.charity) {
      this.dataService.addRecord("charity", charityForm.value)
        .subscribe(
        charityInfo => {
          this.successMessage = "Charity submitted for administrator approval";
        },
        error => {
          this.errorMessage = <any>error;
        });
      charityForm.resetForm();
    }
    else {
      this.dataService.editRecord("charity", charityForm.value, this.id)
        .subscribe(
        charityInfo => {
          this.successMessage = "Charity Updated Successfully";
          this.router.navigate([`/manageCharities`]);
        },
        error => {
          this.errorMessage = <any>error;
        }
        )
    }
    charityForm.resetForm();
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
        this.formErrors[field] = [];
        const control = form.get(field);
  
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            this.formErrors[field].push(messages[key]);
          }
        }
      }
    }
  
    formErrors = {
      'companyName': [],
      'contactFirstName': [],
      'contactLastName': [],
      'taxId': [],
      'username': [],
      'password': [],
      'addressLine': [],
      'city': [],
      'state': [],
      'zip': [],
      'email': [],
      'phoneNumber': []
    };
  
    validationMessages = {
      'companyName': {
        'required':  'Company Name is required.',
        'minlength': 'Company Name must be at least 2 characters long.',
        'maxlength': 'Company Name cannot be more than 40 characters long.'
      },
      'contactFirstName': {
        'required': 'First name is required.',
        'minlength': 'First name must be at least 2 characters long.',
        'maxlength': 'First name cannot be more than 30 characters long.'
      },
      'username': {
        'required': 'User name is required.',
        'minlength': 'User name must be at least 2 characters long.'
      },
      'password': {
        'required':  'Password is required.',
        'minlength': 'Password must be at least 6 characters long.'
      },
      'taxId': {
        'required':  'Tax ID is required.',
        'pattern':   'Tax ID must consist of numbers only',
        'minlength': 'Tax ID must be at least 9 numbers long.',
        'maxlength': 'Tax ID cannot be more than 12 numbers long.'
      },
      'contactLastName': {
        'required':  'Last name is required.',
        'minlength': 'Last name must be at least 2 characters long.',
        'maxlength': 'Last name cannot be more than 30 characters long.'
      },
      'addressLine': {
        'required': ' Addresss is required.',
        'minlength': 'Address Line must be at least 2 characters long.',
        'maxlength': 'Address Line cannot be more than 50 characters long.'
      },
      'city': {
        'required':  'City is required.',
        'minlength': 'City must be at least 2 characters long.',
        'maxlength': 'City cannot be more than 30 characters long.'
      },
      'state': {
        'required':  'State is required.',
        'minlength': 'State must be at least 2 characters long.',
        'maxlength': 'State cannot be more than 30 characters long.'
      },
      'zip': {
        'required': 'Zip Code is required.',
        'minlength': 'Zip Code must be at least 5 numbers long.',
        'pattern': 'Zip Code must be a number'
      },
      'phoneNumber': {
        'pattern': 'Please enter a phone number in the following format: 317-555-5555'
      },
      'email': {
        'required': 'Email is required.',
        'pattern': 'Email address entered is not valid'
      }
    };
  
  }
  



