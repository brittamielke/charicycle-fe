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

  getItems(endpoint: string) {
    this.dataService.getRecords(endpoint)
      .subscribe(
      records => console.log(this.donatedItems = records),
      error => console.log(error));
  }

  getNeededItems(endpoint: string) {
    this.dataService.getRecords(endpoint)
      .subscribe(
      records => console.log(this.neededItems = records),
      error => console.log(error));
  }

  ngOnInit() {
    this.getItems('donatedItems');
    this.getNeededItems('neededItems')
  }

}
