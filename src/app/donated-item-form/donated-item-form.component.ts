import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service'
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-donated-item-form',
  templateUrl: './donated-item-form.component.html',
  styleUrls: ['./donated-item-form.component.css']
})
export class DonatedItemFormComponent implements OnInit {
  donatedItemForm: NgForm;
  @ViewChild('donatedItemForm')
  currentForm: NgForm;
  donorId: number;
  categories = [];
  successMessage: string;
  errorMessage: string;
  imageUrl: string;
  buttonText = "Submit"

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) { }


  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.donorId = +params['id'] : null;
      });
      this.getCategories();
  }
  getCategories() {
    this.dataService.getRecords(`category`)
      .subscribe(
      records => this.categories = records,
      error => console.log(error)
      );
  }
  imageUpload(image: any) {
    this.buttonText = "Loading...";
    console.log(AWS);
    let imageUpload = image.target.files[0];
    console.log(imageUpload.name);
    console.log(image);
    AWS.config.accessKeyId = 'AKIAI522RFFTZBENNHZA';
    AWS.config.secretAccessKey = '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';
    
    let bucket = new AWS.S3({ params: { Bucket: 'charicycle' } });
    let params = { Bucket: 'charicycle', Key: imageUpload.name, Body: imageUpload, ACL: "public-read" };
    bucket.upload(params, (error, res) => {
      this.imageUrl = res["Location"];
      console.log("error: ", error);
      console.log("response: ", res["Location"]);
      this.buttonText = "Submit";

    })
  }

  saveItem(donatedItemForm: NgForm) {
    console.log(`val: ${donatedItemForm.value}`);
    console.log(`loc: ${this.imageUrl}`);
    let donatedItem = donatedItemForm.value;
    let categoryId = donatedItem.category;
    donatedItem["itemImageUrl"] = this.imageUrl;
    donatedItem["category"] = { id: categoryId };
    console.log(donatedItem);
       this.dataService.addRecord(`donatedItems/${this.donorId}`, donatedItem)
         .subscribe(
          result => this.successMessage = "Record added successfully",
          error => this.errorMessage = <any>error
          );
      donatedItemForm.reset();
   }


   ngAfterViewChecked() {
     this.formChanged();
   }

   formChanged() {
     this.donatedItemForm = this.currentForm;
     this.donatedItemForm.valueChanges
       .subscribe(
       data => this.onValueChanged()
       );
   }

   onValueChanged() {
     let form = this.donatedItemForm.form;

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
     'description': '',
     'category': ''
   };

   validationMessages = {
     'category': {
       'required': 'Category is required.',
       'minlength': 'Category must be at least 2 characters long.',
       'maxlength': 'Category cannot be more than 30 characters long.'
     },
     'description': {
       'required': 'Description is required.',
       'minlength': 'Description must be at least 2 characters long.',
       'maxlength': 'Description cannot be more than 255 characters long.'
     }
   };

}
