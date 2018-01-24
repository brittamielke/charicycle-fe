import { Component, OnInit, Input } from '@angular/core';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Subject } from 'rxjs/Subject';
import { DistanceDataService } from '../google-distance.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-claimed-item-table',
  templateUrl: './claimed-item-table.component.html',
  styleUrls: ['./claimed-item-table.component.css'],
  animations: [fadeInAnimation]
})
export class ClaimedItemTableComponent implements OnInit {
  donatedItems;
  @Input() loggedInUser;
  id;
  type;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private dataService: DataService,
    private route: ActivatedRoute) { }

  //get the donated items for a specific donor
  getDonatedItems(){
    this.dataService.getRecords(`/donor/${this.id}/donatedItems`)
      .subscribe(
      records => {
        this.donatedItems = records;
        this.dtTrigger.next();
        this.donatedItems;
      },
      error => console.log(error)
      );
  }

  //get the logged in user
  getUser(endpoint: string) {
    this.dataService.getRecords(endpoint)
      .subscribe(
      records => {
        this.loggedInUser = records;
       
      },
      error => console.log(error),
    );
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.id = +params['id'] : null;
        (params['type']) ? this.type = params['type'] : null;
      });

      this.getUser('donor/' + this.id);
      this.getDonatedItems();
      
      this.dtOptions = {
        columns: [{
          title: 'Category',
          data: 'category.name'
        }, {
          title: 'Description',
          data: 'description'
        }, {
          title: 'Image',
          data: 'itemImageUrl'
        },  {
          title: 'Charity Information',
          data: 'claimedByCharity.companyName'
      
        }],
        // Declare the use of the extension in the dom parameter
        dom: 'Bfrtip',
        // Configure the buttons
        buttons: [
          'colvis',
          'copy',
          'csvHtml5',
        ]
      };
  }

}
