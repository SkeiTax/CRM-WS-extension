import { TimeRange } from './TimeRange';


export class Session {
    source: string;
    type: string;
    ranges: TimeRange[];

    constructor(source: string, type: string, ranges: TimeRange[]) {
        this.source = source;
        this.type = type;
        this.ranges = ranges;
    }
}
