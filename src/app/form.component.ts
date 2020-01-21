import {FormGroup, FormBuilder, FormControl, AbstractControlOptions, ValidatorFn, AsyncValidatorFn} from '@angular/forms';
import {Injector, OnInit} from '@angular/core';

export abstract class FormComponent implements OnInit {

    protected readonly _formBuilder: FormBuilder;
    private _formGroup: FormGroup;

    get formGroup(): FormGroup {
        return this._formGroup;
    }

    get isValid(): boolean {
        return this._formGroup && this._formGroup.valid;
    }

    protected constructor ( injector: Injector ) {
        this._formBuilder = injector.get( FormBuilder );
    }

    ngOnInit(): void {
        this.setupFormGroup();
    }

    rebuild(): void {
        this.setupFormGroup();
    }

    protected setupFormGroup(): void {
        this._formGroup = this.generateFormGroup();
    }

    protected generateFormGroup(): FormGroup {
        const formControls = this.generateFormControls().reduce( ( result, conf ) => {
            result[conf.key] = conf.control;
            return result;
        }, {} );

        return this._formBuilder.group(
            formControls,
            this.generateFormGroupOptions()
        );
    }

    protected abstract generateFormControls(): {key: string, control: FormControl}[];

    protected abstract generateFormGroupOptions(): AbstractControlOptions | {[key: string]: any} | null;

    protected newFormControl(
        validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ) {
        return new FormControl( undefined, validatorOrOpts, asyncValidator );
    }
}
