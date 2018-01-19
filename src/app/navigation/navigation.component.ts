import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  user=null;
  type = null;

  constructor(private dataService: DataService) { }

  ngOnInit(){

  }
  setDonor(){
    if (this.user) {
      if (this.user.taxId) {
        this.type = "charity";
      } else { 
        this.type = "donor";
      }
    }
  }

  logout(){
    this.dataService.logout()
      .subscribe(
      charity => localStorage.removeItem("user")
    );

  }

  ngDoCheck() {
    if (this.user != JSON.parse(localStorage.getItem("user"))){
    this.user = JSON.parse(localStorage.getItem("user"));
    this.setDonor();
    }
  }

}

