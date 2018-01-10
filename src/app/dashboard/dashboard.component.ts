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

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location) { }

  getDonatedItems() {
    this.dataService.getRecords('donatedItems')
      .subscribe(
      records => console.log(this.donatedItems = records),
      error => console.log(error));
  }

  getNeededItems() {
    this.dataService.getRecords('neededItems')
      .subscribe(
      records => console.log(this.neededItems = records),
      error => console.log(error));
  }
  deleteDonatedItem(id){
    this.dataService.deleteRecord('donatedItems', id)
      .subscribe(
      records => this.getDonatedItems(),
      error => console.log(error))
  }

  deleteNeededItem(id) {
    this.dataService.deleteRecord('neededItems', id)
      .subscribe(
      records => this.getNeededItems(),
      error => console.log(error))
  }

  ngOnInit() {
    this.getDonatedItems();
    this.getNeededItems()
  }

}
