import { DateTime, Duration } from "luxon";
import { TimeRange } from "./TimeRange";

export class DayInfo {
  public number: number | undefined;
  public offlineRanges: TimeRange[] = [];
  public onlineRanges: TimeRange[] = [];

  public constructor(
    number: number,
    offlineRanges: TimeRange[],
    onlineRanges: TimeRange[]
  ) {
    this.number = number;
    this.offlineRanges = offlineRanges;
    this.onlineRanges = onlineRanges;
  }

  public get offline() {
    return this.ComputDurationFromRange(this.offlineRanges);
  }

  public get online() {
    return this.ComputDurationFromRange(this.onlineRanges);
  }

  public get duration(): Duration {
    return this.offline.plus(this.online);
  }

  private ComputDurationFromRange(ranges: TimeRange[]) {
    var duration = Duration.fromObject({});
    ranges.forEach((e) => {
      duration = duration.plus(e.diff ?? 0);
    });
    return duration;
  }
}
