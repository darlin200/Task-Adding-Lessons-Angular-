import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class DataService {
    private inputsSource = new BehaviorSubject( [] );
    currentInputs = this.inputsSource.asObservable();

    sendDataInpust( message: any ) {
        this.inputsSource.next( message );
    }

}
