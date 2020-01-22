import {Component, Injector, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Data} from '../data.model';
import {IData} from '../data.interface';
import {
  AbstractControlOptions,
  FormControl,
  Validators
} from '@angular/forms';
import {ModelComponent} from '../model.component';
import {DataService} from '../data.service';
import {BehaviorSubject, timer} from 'rxjs';
import {CaseListDatasource} from './elements.directive';
import {formatDate} from '@angular/common';

// Creating array of data
const ELEMENT_DATA: IData[] = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Boolean logic: for displaying table
  public try = false;
  // Boolean logic: for edit button
  public logic = true;
  public toggle = false;
  public editableInput = false;
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
  public dataSource = new CaseListDatasource(this.subject.asObservable());
  // Define dialog and Data Service
  constructor(public dialog: MatDialog, private dataService: DataService) {}

  ngOnInit() {
    // Fetching date from inputs
    this.dataService.currentInputs.subscribe({
      next: (data: any) => {
        if(data.length >= 1) {
          this.data = data;
          // Defining id in row
          const nextId = ELEMENT_DATA.length
            ? ELEMENT_DATA[ELEMENT_DATA.length - 1].id + 1
            : 1;
          // Pushing new object to our basic array
          ELEMENT_DATA.push({
            id: nextId,
            topic: this.data[0],
            date: this.data[1],
            lecturer: this.data[2]
          });
          // Send new value of our basic array
          this.subject.next(ELEMENT_DATA);
          // Allowing to display rows in html template
          this.try = true;
        }
      }
    });
  }
  // Function OpenDialog is opening DialogComponent
  openDialog() {
    this.dialog.open(DialogComponent, {
      height: '40vw',
      width: '100vh'
    });
  }
  // Edit function which is based on toogling boolean objects
  editRow() {
    this.toggle = !this.toggle;
    this.logic = !this.logic;
    this.editableInput = !this.editableInput;
  }
  //  This function is using id as an argument for deleting  object in array by using id
  deleteRow(id) {
    if(ELEMENT_DATA.length > 1) {
      ELEMENT_DATA.splice(id, 1);
    }
    // Send new value to our basic array
    this.subject.next(ELEMENT_DATA);
  }
}

// Second component is located at the same file. It`s basic realization from  official angular materials exapmples.
@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.css']
})
export class DialogComponent extends ModelComponent<Data> {
  // Creating static variable for formControl
  public static readonly CONTROL_KEY_TOPIC = 'topicFormControl';
  public static readonly CONTROL_KEY_DATE = 'dateFormControl';
  public static readonly CONTROL_KEY_LECTURER = 'lecturerFormControl';
  public static readonly CONTROL_KEY_ID = 'idFormControl';
  public staticScope = DialogComponent;
  // Creating empty array for sending data to Dashboard
  public dataInputs = [];

  constructor(injector: Injector, private dataService: DataService) {
    super(injector);
  }

  // Generate Form Controls from inherited component
  protected generateFormControls(): {key: string; control: FormControl}[] {
    const fControls = [
      {
        key: this.staticScope.CONTROL_KEY_TOPIC,
        control: this.newFormControl(Validators.required)
      },
      {
        key: this.staticScope.CONTROL_KEY_DATE,
        control: this.newFormControl(Validators.required)
      },
      {
        key: this.staticScope.CONTROL_KEY_LECTURER,
        control: this.newFormControl(Validators.required)
      }
    ];
    return fControls;
  }

  // Generate form group options form inherited component
  protected generateFormGroupOptions():
    | AbstractControlOptions
    | {[p: string]: any}
    | null {
    return undefined;
  }

  public addToList() {
    // Formating data of date.
    const format = 'dd/MM/yyyy';
    const locale = 'en-US';
    const getData = formatDate(this.src.date, format, locale);
    console.log(getData);
    // Send to empty array our data from inputs (include our new valid type of date)
    this.dataInputs.push(
      this.formGroup.controls.topicFormControl.value,
      getData,
      this.formGroup.controls.lecturerFormControl.value
    );
    this.dataService.sendDataInpust(this.dataInputs);
  }
}
