import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'
import { fadeInAnimation } from '../animations/fade-in.animation';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
  animations: [fadeInAnimation]
})
export class CategoryFormComponent implements OnInit {

  categoryForm: NgForm;
  @ViewChild('categoryForm')
  currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  category: object;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("category", +params['id']))
      .subscribe(category => this.category = category);
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
  }

  saveCategory(categoryForm: NgForm){
    if(typeof categoryForm.value.id === "number"){
      this.dataService.editRecord("category", categoryForm.value, categoryForm.value.id)
          .subscribe(
            category => this.successMessage = "Record updated successfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("category", categoryForm.value)
          .subscribe(
            category => this.successMessage = "Record added successfully",
            error =>  this.errorMessage = <any>error);
            this.category = {};
    }

  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.categoryForm = this.currentForm;
    this.categoryForm.valueChanges
      .subscribe(
        data => this.onValueChanged()
      );
  }

  onValueChanged() {
    let form = this.categoryForm.form;

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
    'name': ''
  };

  validationMessages = {
    'name': {
      'minlength': 'Category name must be at least 2 characters long.',
      'maxlength': 'Category name cannot be more than 75 characters long.'
    }
    
  };

}
