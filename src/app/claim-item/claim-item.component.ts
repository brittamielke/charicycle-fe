import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { DataService } from '../data.service'
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-claim-item',
  templateUrl: './claim-item.component.html',
  styleUrls: ['./claim-item.component.css'],
  animations: [fadeInAnimation]
})

export class ClaimItemComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  donatedItemId: number;
  donatedItem: object;

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.donatedItemId = +params['id'] : null;
        this.getDonatedItemFromService();
      })
  }

  getDonatedItemFromService() {
    this.dataService.getRecord("donatedItems/", this.donatedItemId)
      .subscribe(
      donatedItem => {
      this.donatedItem = donatedItem;
    });
  }
  // 
}
