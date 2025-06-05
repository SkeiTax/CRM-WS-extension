import { TimeRange } from './TimeRange';


export class Session {
    source: string;
    type: string;
    ranges: TimeRange[];
    get closedRanges() {
        return this.ranges.filter(r => r.begin !== undefined && r.end !== undefined)
    }

    constructor(source: string, type: string, ranges: TimeRange[]) {
        this.source = source;
        this.type = type;
        this.ranges = ranges;
    }
}
