import {EventEmitter, Input, Output, Injector} from '@angular/core';
import {FormComponent} from './form.component';
import {error} from 'util';

export abstract class ModelComponent<T> extends FormComponent {

    protected _src: T;
    protected readonly _srcChange: EventEmitter<T>;

    get src(): T {
        return this._src;
    }

    @Input()
    set src( value: T ) {
        this._src = value;
    }

    @Output()
    get srcChange(): EventEmitter<T> {
        return this._srcChange;
    }

    constructor ( injector: Injector ) {
        super( injector );

        this._src = this._src || {} as T; // TODO: FIx it
        this._srcChange = new EventEmitter();
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.formGroup.valueChanges
            .subscribe( {
                next: ( data: any ) => {
                    return this.srcChange.emit( this.src );
                },
                error: ( err: any ) => console.log( err )
            } );
    }
}
