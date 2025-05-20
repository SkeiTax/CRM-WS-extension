import { DateTime } from 'luxon';
export class TimeRange {
    begin: DateTime | undefined;
    end: DateTime | undefined;
    
    constructor (begin?: DateTime | undefined, end?: DateTime | undefined){
        this.begin = begin
        this.end = end
    }
    get diff() {
        return (this.begin != undefined && this.end != undefined)
            ? this.end.diff(this.begin)
            : undefined
    }
}