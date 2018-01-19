import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataService } from '../data.service';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { Subject } from 'rxjs/Subject';
import { DistanceDataService } from '../google-distance.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [fadeInAnimation]
})
export class DashboardComponent implements OnInit {
  donatedItems;
  neededItems;
  id;
  type;
  @Output() loggedInUser;
  claimedByCharity;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  distanceApiResult;
  destination;

  constructor(private dataService: DataService,
    private distanceDataService: DistanceDataService,
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog) { }

  //get the donated items for a specific donor
  getDonatedItems() {
    this.dataService.getRecords(`/donor/${this.id}/donatedItems`)
      .subscribe(
      records => {
        this.donatedItems = records;
      },
      error => console.log(error)
      );
  }

  getDistanceToItem(item) {
    if (this.type == "donor") {
      this.destination = item.charity.zip;
    }
    if (this.type == "charity") {
      this.destination = item.donorView.zip;
    }
    this.distanceDataService.getDistanceFromApi(this.loggedInUser.zip, this.destination)
      .subscribe(
      result => {
        this.distanceApiResult = result;
        item.distanceTo = this.distanceApiResult.rows[0].elements[0].distance.text;
        this.buildLinkURL(item)
      },
      error => console.log(error)
      );
  }

  //get needed items for specific charity
  getNeededItems() {
    this.dataService.getRecords(`charity/${this.id}/neededItems`)
      .subscribe(
      records => {
        this.neededItems = records;
        this.dtTrigger.next();
      },
      error => console.log("error: " + error)
      );
  }

  //get all the needed items
  getAllNeededItems() {
    this.dataService.getRecords('neededItems')
      .subscribe(

      records => {
        this.neededItems = records
        for (let item of this.neededItems) {
          this.getDistanceToItem(item)
        }
      },
      error => console.log("error: " + error)
      );
  }

  //delete a donated item (no changes)
  deleteDonatedItem(donatedItem) {
    let dialogRef = this.dialog.open(DeleteConfirmComponent, { data: `This will delete donated item with description of "${donatedItem.description}"` });
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
    let dialogRef = this.dialog.open(DeleteConfirmComponent, { data: `This will delete needed item with description of "${neededItem.description}"` });
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



  //get the logged in user
  getUser(endpoint: string) {
    this.dataService.getRecords(endpoint)
      .subscribe(
      records => {
        console.log(this.loggedInUser = records)
        // if (this.type == "charity") {
        //  this.getAllDonatedItems();
        // }
        if (this.type == "donor") {
          this.getAllNeededItems();
        }
      },
      error => console.log(error),
    );
  }

  buildLinkURL(item) {
    if (this.type == "donor") {
      item.directionsURL = this.loggedInUser.addressLine + "+" + this.loggedInUser.city + "+" + this.loggedInUser.state + "+" + this.loggedInUser.zip + "/" + item.charity.addressLine + "+" + item.charity.city + "+" + item.charity.state + "+" + item.charity.zip;
    }
    if (this.type == "charity") {
      item.directionsURL = this.loggedInUser.addressLine + "+" + this.loggedInUser.city + "+" + this.loggedInUser.state + "+" + this.loggedInUser.zip + "/" + item.donorView.addressLine + "+" + item.donorView.city + "+" + item.donorView.state + "+" + item.donorView.zip;;
    }
    console.log(item);
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
    }

    if (this.type == "charity") {
      this.getUser('charity/' + this.id);
      this.getNeededItems();
    }

    
  };

}
