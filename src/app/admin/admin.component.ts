import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  errorMessage;
  charities;

  constructor(private dataService: DataService) { }

  getCharities() {
    this.dataService.getRecords("charity")
      .subscribe(charityFromAPIS => {
        this.charities = charityFromAPIS;
        let charityCounter = 0;
        for (let charity of this.charities) {
          if (!charity.confirmed) {
            charityCounter = charityCounter + 1;
          }
        }
        if (charityCounter == 1) {
          this.errorMessage = `There is 1 charity awaiting approval.  Please go to Manage Charities to confirm or deny these charities.`;
        } else if (charityCounter > 1){
          this.errorMessage = `There are ${charityCounter} charities awaiting approval.  Please go to Manage Charities to confirm or deny these charities.`;
        }
      })
    
  }

  ngOnInit() {
    this.getCharities();
  }

}
