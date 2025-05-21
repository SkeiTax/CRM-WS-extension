import { DateTime, Duration } from "luxon";
import { TimeRange } from "./TimeRange";
import { Session } from './Session';

export class DayInfo {
  public number: number;
  public date: DateTime;
  public sessions: Session[];
  public isWeekend: boolean;

  public constructor(
    date: DateTime,
    sessions: Session[],
    isWeekend: boolean
  ) {
    this.date = date
    this.number = date.day
    this.sessions = sessions
    this.isWeekend = isWeekend
  }

  // public get offline() {
  //   return this.ComputDurationFromRange(this.offlineRanges)
  // }

  // public get online() {
  //   return this.ComputDurationFromRange(this.onlineRanges)
  // }

  public get mergedRanges(): TimeRange[] {
    var ranges: TimeRange[] = []

    var indexInSessions: number[] = this.sessions.map(_=>0);

    const isNotEnd = ()=>{
      return this.sessions.find((session, sessionIndex) => indexInSessions[sessionIndex] < session.ranges.length) !== undefined
    }

    while(isNotEnd()){
      var range = new TimeRange()
      var currentSessionIndex = 0
      while(isNotEnd()) {

        var i = currentSessionIndex
        for(; i < this.sessions.length; i++){
          if (this.checkCollisionRange(range, this.sessions[i].ranges[indexInSessions[i]]))
          {
            currentSessionIndex = i
            break;
          }
        }
        if (i === this.sessions.length) break;

        range = this.mergeRange(range, this.sessions[currentSessionIndex].ranges[indexInSessions[currentSessionIndex]])
        indexInSessions[currentSessionIndex]++
      }

      ranges.push(range)
    }

    //console.log (ranges)
    return ranges;
  }

  private checkCollisionRange(left:TimeRange, right:TimeRange){
    if (left === undefined || right === undefined) return false

    if (left.begin === undefined && left.end === undefined ||
        right.begin === undefined && right.end === undefined)
      return true

    if (left.begin === undefined && right.begin === undefined ||
        left.end === undefined && right.end === undefined)
      return true

    if (left.begin === undefined && right.end === undefined && 
        left.end !== undefined && right.begin !== undefined)
      return left.end.diff(right.begin).toMillis() >= 0

    if (right.begin === undefined && left.end === undefined && 
        right.end !== undefined && left.begin !== undefined)
      return right.end.diff(left.begin).toMillis() >= 0

    if (left.begin !== undefined && right.end !== undefined &&
        right.begin !== undefined && left.end !== undefined){
      return left.end.diff(right.begin).toMillis() >= 0 && left.begin.diff(right.end).toMillis() < 0 ||
             right.end.diff(left.begin).toMillis() >= 0 && right.begin.diff(left.end).toMillis() < 0
    }
    return false;
  }

  private mergeRange(left:TimeRange, right:TimeRange){
    var range = new TimeRange();

    if (left === undefined && right === undefined)
      return range;
    if (left === undefined && right !== undefined)
      return right;
    if (right === undefined && left !== undefined)
      return left;

    if (left.begin === undefined && right.begin !== undefined)
      range.begin = right.begin
    if (right.begin === undefined && left.begin !== undefined)
      range.begin = left.begin
    if (right.begin !== undefined && left.begin !== undefined)
      range.begin = left.begin.diff(right.begin).toMillis() < 0 ? left.begin : right.begin;
    
    if (left.end === undefined && right.end !== undefined)
      range.end = right.end
    if (right.end === undefined && left.end !== undefined)
      range.end = left.end
    if (right.end !== undefined && left.end !== undefined)
      range.end = left.end.diff(right.end).toMillis() > 0 ? left.end : right.end;

    return range
  }

  public get duration(): Duration {
    var duration = Duration.fromMillis(0);
    this.mergedRanges.forEach(range => {
      var _diff = range.diff
      if (_diff != undefined)
        duration = duration.plus(_diff)
    })

    return duration;
  }

  private MinFromThreeTimeRange(f: TimeRange, s: TimeRange, t: TimeRange){
    var min = Math.min(f.begin?.toSeconds() ?? NaN, s.begin?.toSeconds() ?? NaN, t.begin?.toSeconds() ?? NaN)
    if (isNaN(min)) return undefined
    return 
  }

  private ComputDurationFromRange(ranges: TimeRange[]) {
    var duration = Duration.fromObject({});
    ranges.forEach((e) => {
      duration = duration.plus(e.diff ?? 0);
    });
    return duration;
  }
}

