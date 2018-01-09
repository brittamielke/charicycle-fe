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

  successMessage: string;
  errorMessage: string;
  imageUrl: string;
  movie: object;

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
  }

  imageUpload(image: any) {
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

    })
  }

  saveItem(donatedItemForm: NgForm) {
    console.log(`val: ${donatedItemForm.value}`);
    console.log(`loc: ${this.imageUrl}`);
    let donatedItem = donatedItemForm.value;
    donatedItem["itemImageUrl"] = this.imageUrl;
    console.log(donatedItem);
       this.dataService.addRecord("donatedItems", donatedItem)
         .subscribe(
         student => console.log(this.successMessage = "Record added successfully"),
         error => this.errorMessage = <any>error);
       this.movie = {};
   }


  // ngAfterViewChecked() {
  //   this.formChanged();
  // }

  // formChanged() {
  //   this.movieForm = this.currentForm;
  //   this.movieForm.valueChanges
  //     .subscribe(
  //     data => this.onValueChanged()
  //     );
  // }

  // onValueChanged() {
  //   let form = this.movieForm.form;

  //   for (let field in this.formErrors) {
  //     // clear previous error message (if any)
  //     this.formErrors[field] = '';
  //     const control = form.get(field);

  //     if (control && control.dirty && !control.valid) {
  //       const messages = this.validationMessages[field];
  //       for (const key in control.errors) {
  //         this.formErrors[field] += messages[key] + ' ';
  //       }
  //     }
  //   }
  // }

  // formErrors = {
  //   'title': '',
  //   'distributor': '',
  //   'budget': '',
  //   'releaseDate': ''
  // };

  // validationMessages = {
  //   'title': {
  //     'required': 'Movie title is required.',
  //     'minlength': 'Movie title must be at least 2 characters long.',
  //     'maxlength': 'Movie title cannot be more than 30 characters long.'
  //   },
  //   'distributor': {
  //     'required': 'Distributor is required.',
  //     'minlength': 'Distributor must be at least 2 characters long.',
  //     'maxlength': 'Distributor cannot be more than 30 characters long.'
  //   },
  //   'budget': {
  //     'pattern': 'budget must be a number'
  //   },
  //   'releaseDate': {
  //     'pattern': 'Release date should be in the following format: MM/DD/YYYY'
  //   }
  // };

}
