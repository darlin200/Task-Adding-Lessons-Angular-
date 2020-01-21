import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';


export class CaseListDatasource extends DataSource<any> {


    constructor ( private list: Observable<any[]> ) {
        super();
    }

    connect(): Observable<any[]> {
        return this.list;
    }

    disconnect() {
    }
}