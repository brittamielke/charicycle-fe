import { Component, OnInit, Input, Output, EventEmitter}from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  itemsList;

  constructor(private dataService: DataService) {}

  getDataFromService() {
    this.dataService.getItemsList()
      .subscribe(
      itemsList => {

        this.itemsList = itemsList[0];
      }
      )
  }
  ngOnInit() {
    this.getDataFromService()
  }
} 
}
