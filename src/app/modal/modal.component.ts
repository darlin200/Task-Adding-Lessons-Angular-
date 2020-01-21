import {Component, Injector, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {User} from '../core/user.model';
import {AbstractControlOptions, FormControl, Validators} from '@angular/forms';
import {ModelComponent} from '../model.component';
import {DataService} from '../user.service';
import {BehaviorSubject} from 'rxjs';
import {CaseListDatasource} from './elements.directive';

export interface IUserData {
  id?: number;
  topic?: string;
  date?: string;
  lecturer?: string;
  action?: string;
}

const ELEMENT_DATA: IUserData[] = [

];

@Component( {
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.css'],
} )
export class ModalComponent implements OnInit {
  public try: boolean = false;
  public logic: boolean = true;
  public toggle: boolean = false;
  public editableInput: boolean = false;
  public message: any;
  public displayedColumns: string[] = ['id', 'date', 'topic', 'lecturer', 'action'];
  public subject = new BehaviorSubject( ELEMENT_DATA );
  public dataSource = new CaseListDatasource( this.subject.asObservable() );
  constructor ( public dialog: MatDialog, private dataService: DataService ) {
  }

  ngOnInit() {
    this.dataService.currentMessage.subscribe( {
      next: ( message: any ) => {
        if( message.length >= 1 ) {
          this.message = message;
          ELEMENT_DATA.push( {id: ELEMENT_DATA.length + 1, topic: this.message[0], date: this.message[1], lecturer: this.message[2]} );
          this.subject.next( ELEMENT_DATA );
          this.try = true;
        }
      }
    } );
  }

  openDialog() {
    const dialogRef = this.dialog.open( DialogComponent, {
      height: '40vw',
      width: '100vh'
    } );

    dialogRef.afterClosed().subscribe( {
      next: () => {
      },
      error: () => {
      }
    } );
    dialogRef.afterOpened().subscribe( data => {
    } );
  }

  editRow() {
    this.toggle = !this.toggle;
    this.logic = !this.logic;
    this.editableInput = !this.editableInput;
  }

  deleteRow() {
    if( ELEMENT_DATA.length > 1 ) {
      this.subject.subscribe( {
        next: ( myData: any ) => {
          myData.pop();
          console.log( myData );
        }
      } );
    }
    this.subject.next( ELEMENT_DATA );
  }
}

// Second component

@Component( {
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.css']
} )
export class DialogComponent extends ModelComponent<User> {
  public static readonly CONTROL_KEY_TOPIC = 'topicFormControl';
  public static readonly CONTROL_KEY_DATE = 'dateFormControl';
  public static readonly CONTROL_KEY_LECTURER = 'lecturerFormControl';
  public static readonly CONTROL_KEY_ID = 'idFormControl';

  users = [];
  staticScope = DialogComponent;
  message: any;

  constructor ( injector: Injector, private dataService: DataService ) {
    super( injector );
  }

  protected generateFormControls(): {key: string; control: FormControl}[] {
    const fControls = [
      {
        key: this.staticScope.CONTROL_KEY_TOPIC,
        control: this.newFormControl(
          Validators.required
        )
      },
      {
        key: this.staticScope.CONTROL_KEY_DATE,
        control: this.newFormControl(
          Validators.required
        )
      },
      {
        key: this.staticScope.CONTROL_KEY_LECTURER,
        control: this.newFormControl(
          Validators.required
        )
      }
    ];
    return fControls;
  }

  protected generateFormGroupOptions(): AbstractControlOptions | {[p: string]: any} | null {
    return undefined;
  }

  public addToList() {
    this.users.push( this.formGroup.controls.topicFormControl.value, this.formGroup.controls.dateFormControl.value,
      this.formGroup.controls.lecturerFormControl.value );
    this.dataService.currentMessage.subscribe( {
      next: ( message: any ) => {
        this.message = message;
      },
      error: ( err: any ) => {
        console.log( err );
      }
    } );
    this.dataService.changeMessage( this.users );
  }
}

