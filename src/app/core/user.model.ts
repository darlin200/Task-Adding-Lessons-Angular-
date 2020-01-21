import {IUser} from './user.interface';

export class User {

    private _topic: string;
    private _date: string;
    private _lecturer: string;
    private _id: number;

    get id(): number {
        return this._id;
    }

    set id( value: number ) {
        this._id = value;
    }


    get topic(): string {
        return this._topic;
    }

    set topic( value: string ) {
        this._topic = value;
    }

    get date(): string {
        return this._date;
    }

    set date( value: string ) {
        this._date = value;
    }

    get lecturer(): string {
        return this._lecturer;
    }

    set lecturer( value: string ) {
        this._lecturer = value;
    }

    get data(): IUser {
        return {
            id: this._id,
            topic: this._topic,
            date: this._date,
            lecturer: this._lecturer
        };
    }

    protected parse( data: IUser ): void {
        this._id = data.id;
        this._topic = data.topic;
        this._date = data.date;
        this._lecturer = data.lecturer;
    }
}
