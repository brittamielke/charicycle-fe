import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CharityInfoService } from '../charity-navigator.service';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-validate-charity',
  templateUrl: './validate-charity.component.html',
  styleUrls: ['./validate-charity.component.css'],
  animations: [fadeInAnimation]
})
export class ValidateCharityComponent implements OnInit {

  charityInfoApiResult;
  charity;
  charityId;

  constructor(
    private dataService: DataService,
    private charityInfoService: CharityInfoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.charityId = +params['id'] : null;
      });

    this.dataService.getRecord("charity", this.charityId)
    .subscribe(
      charity => {
        this.charity = charity;
        this.charityInfoService.getCharityInfo(this.charity.taxId)
        .subscribe(
          result => {
            this.charityInfoApiResult = result
            console.log(this.charityInfoApiResult);
          },
          error => console.log("error: " + error)
        )

      } 
    )
  }
}
