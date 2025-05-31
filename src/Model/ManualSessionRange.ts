import { DateTime } from 'luxon';
import { TimeRange } from './TimeRange';


export enum ManualSessionType{
    manual,
    vacation,
    medical,
}

export class ManualSessionRange extends TimeRange{
    type: ManualSessionType;

    constructor(begin: DateTime, end: DateTime, type: ManualSessionType){
        super(begin, end);
        this.type = type;
    }
}