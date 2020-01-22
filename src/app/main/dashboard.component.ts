import {Component, Injector, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatDialog} from '@angular/material';
import {IData} from '../data.interface';
import {DataService} from '../data.service';
import {BehaviorSubject} from 'rxjs';
import {DialogComponent} from './dialog.component';

// Creating array of data
const ELEMENT_DATA: IData[] = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Boolean logic for displaying table
  public modalWindow = false;
  // Empty variable for fetching data whiсh is using in onInit
  public data: any;
  // Define name of displayed columns
  public displayedColumns: string[] = [
    'id',
    'date',
    'topic',
    'lecturer',
    'action'
  ];
  // Define our array as behaviorSubject
  public subject = new BehaviorSubject(ELEMENT_DATA);
  // Define dataSourse for creating observable for subject
  public dataSource = this.subject.asObservable();
  // Define dialog and Data Service
  constructor(public dialog: MatDialog, private dataService: DataService) {}

  ngOnInit() {
    // Fetching date from inputs
    this.dataService.currentInputs.subscribe({
      next: (data: any) => {
        if(data.length >= 1) {
          this.data = data;
          // Defining id in a row
          const nextId = ELEMENT_DATA.length
            ? ELEMENT_DATA[ELEMENT_DATA.length - 1].id + 1
            : 1;
          // Pushing new object to our basic an array
          ELEMENT_DATA.push({
            id: nextId,
            topic: this.data[0],
            date: this.data[1],
            lecturer: this.data[2],
            edit: false
          });
          if(ELEMENT_DATA.length > 0) {
            this.modalWindow = true;
          }
          // Send new value of our basic array
          this.subject.next(ELEMENT_DATA);
          // Allowing to display rows in html template
        }
      }
    });
  }
  // Function OpenDialog is opening DialogComponent
  openDialog() {
    this.dialog.open(DialogComponent, {
      height: '40vw',
      width: '100vh',
      panelClass: 'dialog-wrapper'
    });
  }
  // Edit function which is based on toogling element 'key' in object
  editRow(id) {
    if(ELEMENT_DATA[id].edit === false) {
      ELEMENT_DATA[id].edit = true;
    } else if(ELEMENT_DATA[id].edit === true) {
      ELEMENT_DATA[id].edit = false;
    }
    this.subject.next(ELEMENT_DATA);
  }

  deleteRow(id) {
    // using id as an argument for deleting  object in array
    if(ELEMENT_DATA.length >= 0) {
      ELEMENT_DATA.splice(id, 1);
    }
    // Hide table if our array dont have a data
    if(ELEMENT_DATA.length === 0) {
      this.modalWindow = false;
    }
    // Send new value to our basic array
    this.subject.next(ELEMENT_DATA);
  }
}

