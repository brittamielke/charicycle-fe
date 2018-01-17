import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
  successMessage;
  errorMessage;


  constructor(private dataService: DataService) { }

  login(loginForm: NgForm){
    console.log(loginForm.value);
    this.dataService.login(loginForm.value)
      .subscribe(
      user => {this.successMessage = "Login Successful";
              localStorage.setItem("user", JSON.stringify(user))},
      error => this.errorMessage = <any>error);

  }

  ngOnInit() {
  }

}
