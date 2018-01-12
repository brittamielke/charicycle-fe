import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  donatedItems;
  neededItems;
  id;
  type;
  loggedInUser = [];
  donatedItem;
  donorId;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location) { }

  //get the donated items for a specific donor
  getDonatedItems() {
    this.dataService.getRecords(`/donor/${this.id}/donatedItems`)
      .subscribe(
      records => this.donatedItems = records,
      error => console.log(error)
      );
  }

  //get all the donated items
  getAllDonatedItems() {
    this.dataService.getRecords(`/donatedItems`)
      .subscribe(
      records => this.donatedItems = records,
      error => console.log(error)
      );
  }

  //get needed items for specific charity
  getNeededItems() {
    this.dataService.getRecords(`charity/${this.id}/neededItems`)
      .subscribe(
      records => this.neededItems = records,
      error => console.log("error: " + error)
      );
  }

  //get all the needed items
  getAllNeededItems() {
    this.dataService.getRecords('neededItems')
      .subscribe(
      records => this.neededItems = records,
      error => console.log("error: " + error)
      );
  }

  //delete a donated item (no changes)
  deleteDonatedItem(id) {
    this.dataService.deleteRecord('donatedItems', id)
      .subscribe(
      records => this.getDonatedItems(),
      error => console.log(error)
      );
  }

  //delete a needed item
  deleteNeededItem(id) {
    this.dataService.deleteRecord('neededItems', id)
      .subscribe(
      records => this.getNeededItems(),
      error => console.log(error)
      );
  }
  updateDonatedItemToClaimed(donatedItemId) {
    this.dataService
      .getRecord('donatedItems', donatedItemId)
      .subscribe(
      donatedItem => {
        this.donatedItem = donatedItem;
        console.log(this.donatedItem);
        this.donatedItem['claimedCharityId'] = this.id;
        console.log(this.donatedItem);
        let donorId = this.donatedItem.donorView.id;
        this.dataService
          .editRecord('donatedItems/'+ this.donatedItem.donorView.id, this.donatedItem, donatedItemId)
          .subscribe(
          donatedItem => { 
            this.donatedItem = donatedItem,
            console.log(this.donatedItem)}
      );
  }
      );
}

//get the logged in user
getUser(endpoint: string) {
  this.dataService.getRecords(endpoint)
    .subscribe(
    records => console.log(this.loggedInUser = records),
    error => console.log(error)
    );
}

ngOnInit() {

  this.route.params
    .subscribe((params: Params) => {
      (+params['id']) ? this.id = +params['id'] : null;
      (params['type']) ? this.type = params['type'] : null;
    });

  if (this.type == "donor") {
    this.getUser('donor/' + this.id);
    this.getDonatedItems();
    this.getAllNeededItems();
  }

  if (this.type == "charity") {
    this.getUser('charity/charityForm/' + this.id);
    this.getAllDonatedItems();
    this.getNeededItems();
  }



}

}
