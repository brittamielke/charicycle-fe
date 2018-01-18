import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'
import { fadeInAnimation } from '../animations/fade-in.animation';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { MatDialog, MatDialogRef } from '@angular/material';


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
  categoryForUpdate: object = {};

  successMessage: string;
  errorMessage: string;
  user;

  categories: object;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getCategories();
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  getCategories(){
    this.dataService.getRecords("category")
      .subscribe(
      categories => {
        this.categories = categories.sort(this.compare)});

  }

  compare(a, b) {
  const genreA = a.id;
  const genreB = b.id;

  let comparison = 0;
  if (genreA > genreB) {
    comparison = 1;
  } else if (genreA < genreB) {
    comparison = -1;
  }
  return comparison;
}

  updateCategory(category){
    this.categoryForUpdate = category;
  }
  cancelUpdate() {
    this.categoryForUpdate = {};
  }

  saveCategory(categoryForm: NgForm){
    if(typeof categoryForm.value.id === "number"){
      this.dataService.editRecord("category", categoryForm.value, categoryForm.value.id)
          .subscribe(
            category => {this.successMessage = "Record updated successfully";
                        this.categoryForUpdate = {};
                        this.getCategories();
                      },
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("category", categoryForm.value)
          .subscribe(
            category => this.successMessage = "Record added successfully",
            error =>  this.errorMessage = <any>error);
            this.getCategories();
    }

  }

  deleteCategory(category){
    let deleteMessage;
    let dialogRef = this.dialog.open(DeleteConfirmComponent, { data: "This will delete category: " + category.name });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteRecord("category", category.id)
          .subscribe(
          charityInfo => {
            this.successMessage = "Category " + category.name + " was deleted successfully";
            this.getCategories();
          },
          error => {
            this.errorMessage = "There are one or more items that have this category assigned.  Before deleting, please remove these items from the database";
          }
          )

      }
    })
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
