import { DateTime } from 'luxon';
export class TimeRange {
    begin: DateTime;
    end: DateTime;
    constructor (begin: DateTime, end: DateTime){
        this.begin = begin
        this.end = end
    }
    get diff() {
        return (this.begin != undefined && this.end != undefined)
            ? this.end.minus(this.begin)
            : undefined
    }
}