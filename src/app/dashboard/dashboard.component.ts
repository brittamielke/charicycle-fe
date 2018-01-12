import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataService } from '../data.service';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';

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

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location, public dialog: MatDialog) { }

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
  deleteDonatedItem(donatedItem) {
    let dialogRef = this.dialog.open(DeleteConfirmComponent, { data: donatedItem });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteRecord('donatedItems', donatedItem.id)
          .subscribe(
          records => this.getDonatedItems(),
          error => console.log(error)
          );
      }
    })
  }

  //delete a needed item
  deleteNeededItem(neededItem) {
    let dialogRef = this.dialog.open(DeleteConfirmComponent, { data: neededItem });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteRecord('neededItems', neededItem.id)
          .subscribe(
          records => this.getNeededItems(),
          error => console.log(error)
          );
      }
    })
  }
  updateDonatedItemToClaimed(donatedItemId) {
    this.dataService
      .getRecord('donatedItems', donatedItemId)
      .subscribe(
      donatedItem => {
        this.donatedItem = donatedItem;
        this.donatedItem['claimedCharityId'] = '3';
        console.log(this.donatedItem);
        this.dataService
          .editRecord('donatedItems', this.donatedItem, donatedItemId)
          .subscribe(
          record => console.log("Successfully Updated")
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
