import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service'
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-needed-item-form',
  templateUrl: './needed-item-form.component.html',
  styleUrls: ['./needed-item-form.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class NeededItemFormComponent implements OnInit {

  neededItemForm: NgForm;
  @ViewChild('neededItemForm')
  currentForm: NgForm;
  charityId: number;

  successMessage: string;
  errorMessage: string;
 
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.charityId = +params['id'] : null;
      });
  }

  saveItem(neededItemForm: NgForm) {
    let neededItem = neededItemForm.value;
        console.log(neededItem);
       this.dataService.addRecord(`neededItems/${this.charityId}`, neededItem)
         .subscribe(
         result => console.log(this.successMessage = "Record added successfully"),
         error => this.errorMessage = <any>error);
    neededItemForm.reset();
   }

}
