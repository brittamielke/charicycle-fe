import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
  successMessage;
  errorMessage;
  user = null;
  type;

  constructor(private dataService: DataService, private router: Router) { }

  login(loginForm: NgForm){
    this.dataService.login(loginForm.value)
      .subscribe(
      user => {this.successMessage = "Login Successful";
              console.log(this.user = user);
        localStorage.setItem("user", JSON.stringify(user))
        if (this.user.admin) {
          this.router.navigate([`/admin`]);
        }
          else if (this.user.taxId) {
            this.router.navigate([`/dashboard/charity/${this.user.id}`]);
          } else {
            this.router.navigate([`/dashboard/donor/${this.user.id}`]);
          }
          
          },
      error => this.errorMessage = <any>error);

  }

  ngOnInit() {
  }

}
