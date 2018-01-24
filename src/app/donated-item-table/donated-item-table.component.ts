import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { DataService } from '../data.service';
import { Subject } from 'rxjs/Subject';
import { DistanceDataService } from '../google-distance.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-donated-item-table',
  templateUrl: './donated-item-table.component.html',
  styleUrls: ['./donated-item-table.component.css'],
  animations: [fadeInAnimation]
})
export class DonatedItemTableComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  max: number;
  min: number;
  id;
  donatedItem;
  donorId;
  donatedItems;
  destination;
  distanceApiResult;
  type;
  @Input() loggedInUser;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();


  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private distanceDataService: DistanceDataService
  ) { }

  //get all the donated items from all donors
  getAllDonatedItems() {
    this.dataService.getRecords(`/donatedItems`)
      .subscribe(
      records => {
        this.donatedItems = records;
        this.dtTrigger.next();
        for (let item of this.donatedItems) {
          this.getDistanceToItem(item)
        }
      },
      error => console.log(error)
      );
  }

  getDistanceToItem(item) {
    if (this.type == "donor") {
      this.destination = item.charity.zip;
    }
    if (this.type == "charity") {
      this.destination = item.donorView.zip;
    }
    this.distanceDataService.getDistanceFromApi(this.loggedInUser.zip, this.destination)
      .subscribe(
        result => {
          this.distanceApiResult = result;
          item.distanceTo = this.distanceApiResult.rows[0].elements[0].distance.text;
          this.buildLinkURL(item)
        },
        error => console.log(error)
      );
  }

  buildLinkURL(item) {
    
    item.directionsURL = this.loggedInUser.addressLine + "+" + 
                         this.loggedInUser.city + "+" + 
                         this.loggedInUser.state + "+" + 
                         this.loggedInUser.zip + "/";

    if (this.type == "donor") {
      item.directionsURL += item.charity.addressLine + "+" +
                            item.charity.city + "+" + 
                            item.charity.state + "+" + 
                            item.charity.zip;
    }
    if (this.type == "charity") {
      item.directionsURL += item.donorView.addressLine + "+" + 
                           item.donorView.city + "+" + 
                           item.donorView.state + "+" + 
                           item.donorView.zip;
    }
  }

  updateDonatedItemToClaimed(donatedItemId) {
    //sends the donatedItem id to the API and returns dontatedItem Object (donated item view)
    this.dataService
      .getRecord('donatedItems', donatedItemId)
      .subscribe(
        donatedItem => {
          this.donatedItem = donatedItem;
          //save off the donor ID since it wont be returned in the object
          this.donorId = this.donatedItem.donorView.id;
          //takes the logged in charity id and sends it to the donateditems API to update the claimedByCharity object on the donated item.
          this.dataService.editRecord("donatedItems/" + this.id, this.donatedItem, donatedItemId)
            .subscribe(
            donatedItem => {
              this.donatedItem = donatedItem;
              //object returned is a donatedItem view and does not include the donor so we have to update the record again to save the donor ID
              this.dataService
                .editRecord('donatedItems/' + this.donorId, this.donatedItem, donatedItemId)
                .subscribe(
                  donatedItem =>
                    this.donatedItem = donatedItem
                  )
            });
      });
  }
  //get the logged in user
  getUser(endpoint: string) {
    this.dataService.getRecords(endpoint)
      .subscribe(
        records => {
          this.loggedInUser = records;
          this.getAllDonatedItems();
        },
        error => console.log(error)
      );
  }


  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.id = +params['id'] : null;
        (params['type']) ? this.type = params['type'] : null;
      });

    if (this.type == "donor") {
      this.getUser('donor/' + this.id);
    }

    if (this.type == "charity") {
      this.getUser('charity/' + this.id);
    }

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
      }, {
        title: 'Approx Distance',
        data: 'distanceTo'
      }, {
        title: 'Get Directions',
      },{
        title: 'Claim Item'
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
    // We need to call the $.fn.dataTable like this because DataTables typings do not have the "ext" property
    $.fn['dataTable'].ext.search.push((settings, data, dataIndex) => {
      if(this.max == null){
        return true;
      }
      const distanceTo = parseFloat(data[3]) || 0; // use data for the distance column
      if ((isNaN(this.min) && isNaN(this.max)) ||
        (isNaN(this.min) && distanceTo <= this.max) ||
        (this.min <= distanceTo && isNaN(this.max)) ||
        (this.min <= distanceTo && distanceTo <= this.max)) {
        return true;
      }
      return false;
    });
  }
  ngOnDestroy(): void {
    // We remove the last function in the global ext search array so we do not add the fn each time the component is drawn
    // /!\ This is not the ideal solution as other components may add other search function in this array, so be careful when
    // handling this global variable
    $.fn['dataTable'].ext.search.pop();
  }

  filterByDistance(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
}


