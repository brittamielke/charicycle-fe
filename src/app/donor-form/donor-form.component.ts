import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from '../data.service'
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-donor-form',
  templateUrl: './donor-form.component.html',
  styleUrls: ['./donor-form.component.css'],
  animations: [fadeInAnimation]
})
export class DonorFormComponent implements OnInit {

  donorForm: NgForm;
  @ViewChild('donorForm')
  currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  donor: object;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("donor", +params['id']))
      .subscribe(donor => this.donor = donor);
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
  }

  saveDonor(donorForm: NgForm){
    if(typeof donorForm.value.id === "number"){
      this.dataService.editRecord("donor", donorForm.value, donorForm.value.id)
          .subscribe(
            donor => {
              this.successMessage = "Record updated successfully";
              this.router.navigate([`/manageDonors`]);;
            },
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("donor", donorForm.value)
          .subscribe(
            donor => this.successMessage = "Donor Added Successfully",
            error =>  this.errorMessage = <any>error);
    }
    donorForm.resetForm();

  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.donorForm = this.currentForm;
    this.donorForm.valueChanges
      .subscribe(
        data => this.onValueChanged()
      );
  }

  onValueChanged() {
    let form = this.donorForm.form;

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
    'addressLine': [],
    'city': [],
    'state': [],
    'zip': [],
    'phoneNumber': [],
    'email': [],
    'username': [],
    'password': []
  };

  validationMessages = {
    'companyName': {
      'minlength': 'Company Name must be at least 2 characters long.',
      'maxlength': 'Company Name cannot be more than 40 characters long.'
    },
    'username': {
      'required': 'User name is required.',
      'minlength': 'User name must be at least 2 characters long.'
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 6 characters long.'
    },
    'contactFirstName': {
      'required': 'First name is required.',
      'minlength': 'First name must be at least 2 characters long.',
      'maxlength': 'First name cannot be more than 30 characters long.'
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


