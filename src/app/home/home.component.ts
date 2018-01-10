import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { DataService } from '../data.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class HomeComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  charities: any[];
  donors: any[];
  selectedId;

  constructor(private dataService: DataService) { }

  getCharity() {
    this.dataService.getRecords("charity/charityForm")
      .subscribe(
        charity => console.log(this.charities = charity),
        error =>  this.errorMessage = <any>error);
  }
  getDonor() {
    this.dataService.getRecords("donor")
      .subscribe(
        donor => console.log(this.donors = donor),
        error =>  this.errorMessage = <any>error);
  }
  setSelectedId(id){
    console.log(id);

  }

  
  ngOnInit() { 
    this.getCharity();
    this.getDonor(); 
  }

}


 