import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DashboardComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    console.log('data', this.data);
  }

  ngOnInit() {
  }

}
