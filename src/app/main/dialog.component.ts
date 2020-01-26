import {Component, Injector} from '@angular/core';
import {ModelComponent} from '../model.component';
import {Data} from '@angular/router';
import {DataService} from '../data.service';
import {FormControl, Validators, AbstractControlOptions} from '@angular/forms';
import {formatDate} from '@angular/common';

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
                control: this.newFormControl(
                    [
                        Validators.required,
                        Validators.minLength(3)
                    ])
            },
            {
                key: this.staticScope.CONTROL_KEY_DATE,
                control: this.newFormControl(
                    [
                        Validators.required,
                        Validators.minLength(10)
                    ])
            },
            {
                key: this.staticScope.CONTROL_KEY_LECTURER,
                control: this.newFormControl([
                    Validators.required,
                    Validators.minLength(3)
                ])
            }
        ];
        return fControls;
    }

    // Generate form group options from inherited component
    protected generateFormGroupOptions():
        | AbstractControlOptions
        | {[p: string]: any}
        | null {
        return undefined;
    }

    public addToList() {
        // Send to empty array our data from inputs
        this.dataInputs.push(
            this.src.topic,
            this.src.date,
            this.src.lecturer
        );
        this.dataService.sendDataInpust(this.dataInputs);
    }

    public dateValidator() {
        this.src.date = this.src.date.replace(/[^0-9/]/g, '');
        if(this.src.date.length === 2){
        this.src.date +=  '/';
        } else if (this.src.date.length === 5){
            this.src.date +=  '/';
        }
    }
}
