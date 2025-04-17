import { DateTime } from "luxon";
import { TimeRange } from "./TimeRange";

export class DayInfo {
    public number: number | undefined;
    public offlineRanges: TimeRange[] = [];
    public onlineRanges: TimeRange[] = [];
    
    public get offline() {
        return this.offlineRanges.reduce((p, c)=>{
            p.begin = p.begin ?? c.begin
            p.end = c.end
            return p
        })
    };
    public get online() {
        return this.onlineRanges.reduce((p, c)=>{
            p.begin = p.begin ?? c.begin
            p.end = c.end
            return p
        })
    };

    public constructor(number: number, offlineRanges: TimeRange[]){
        this.number = number
        this.offlineRanges = offlineRanges
    };
}