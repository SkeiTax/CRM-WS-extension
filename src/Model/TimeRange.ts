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
    
    
    static compare(leftRange: TimeRange, rightRange: TimeRange) {
        if (leftRange.begin !== undefined && rightRange.begin !== undefined) {
            return Math.sign(leftRange.begin.diff(rightRange.begin).toMillis())
        }
        if (leftRange.begin === undefined && rightRange.begin !== undefined) {
            return 1
        }
        if (leftRange.begin !== undefined && rightRange.begin === undefined) {
            return -1
        }
        if (leftRange.begin === undefined && rightRange.begin === undefined) {
            if (leftRange.end === undefined) return 1
            if (rightRange.end === undefined) return -1
            if (leftRange.end === undefined && rightRange.end === undefined) return 0
            return Math.sign(leftRange.end.diff(rightRange.end).toMillis())
        }
        return 0
    }
}