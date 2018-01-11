import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../animations/fade-in.animation';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  animations: [fadeInAnimation]
})
export class ContactUsComponent implements OnInit {

  lat: number = 39.970188;
  lng: number = -86.159308;

  constructor() { }

  ngOnInit() {
  }

}
