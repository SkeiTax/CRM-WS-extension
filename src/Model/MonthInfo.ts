import { DateTime, Duration } from "luxon";
import { DayInfo } from "./DayInfo";
import { Range } from "../Domain/Range";
import { Time } from "../Domain/Time";
import { TimeRange } from "./TimeRange";

export class MonthInfo {
  public days: DayInfo[] = [];
  private _table: HTMLTableElement;
  private filterDate: DateTime;


  public get OfflineWorkDuration(): Duration {
    return MonthInfo.ComputeDuration(this.days, (d) => { return d.offline });
  }
  public get OnlineWorkDuration(): Duration {
    return MonthInfo.ComputeDuration(this.days, (d) => { return d.online });
  }
  public get TotalWorkDuration(): Duration {
    return MonthInfo.ComputeDuration(this.days, (d) => { return d.duration });
  }

  public get WorkingDays(): DayInfo[] {
    return this.days.filter(day => !day.isWeekend);
  }
  public get DaysWorked(): DayInfo[] {
    if (this.filterDate.month != DateTime.now().month)
      return this.WorkingDays

    return this.WorkingDays.filter(day => day.number <= DateTime.now().day)

  }

  constructor(table: HTMLTableElement, filterDate: DateTime) {
    this._table = table;
    this.filterDate = filterDate;
    Array.from(table.tBodies[0].rows).forEach((element, index) => {
      //console.log('######## row ' + index + '########');
      Array.from(element.children).forEach((e) => {
        if (e.children.length == 0) return;

        var element = e.children[0] as HTMLDivElement;

        var isWeekend = (e as HTMLElement).style.background == "rgb(255, 210, 173)"

        var cellContent = element.querySelector('a') as unknown as HTMLLinkElement;
        if (cellContent == undefined) return;
        var cellToolTips = element.children.length > 1 ? element.children[1].children[0].querySelectorAll(".d-column") : undefined;


        var offlineRangesSource = cellToolTips != undefined && cellToolTips.length > 0
          ? Array.from(cellToolTips[0].children[1].children) as HTMLDivElement[]
          : undefined;
        var onlineRangesSource = cellToolTips != undefined && cellToolTips.length > 1
          ? Array.from(cellToolTips[1].children[1].children) as HTMLDivElement[]
          : undefined;

        var day = Number(cellContent.children[0]?.textContent ?? cellContent.textContent);

        var offlineRanges = new Array<TimeRange>();
        var onlineRanges = new Array<TimeRange>();

        var date = DateTime.fromObject({
          year: filterDate.year,
          month: filterDate.month,
          day: day
        })

        offlineRangesSource?.forEach((e) => { this.ConstructRanges(offlineRanges, e, date); });
        onlineRangesSource?.forEach((e) => { this.ConstructRanges(onlineRanges, e, date); });

        this.days.push(new DayInfo(day, offlineRanges, onlineRanges, isWeekend));
      });
    });

    if (filterDate.month == DateTime.now().month){

      var cday = this.days.findLast((day) => day.number == DateTime.now().day)
      if (cday != undefined){
        var lastOnlineRange = cday.onlineRanges[cday.onlineRanges.length-1];
        var lastOfflineRange = cday.offlineRanges[cday.offlineRanges.length-1]
        if (lastOnlineRange !== undefined && lastOnlineRange.end === undefined)
          lastOnlineRange.end = DateTime.now()
        if (lastOfflineRange !== undefined && lastOfflineRange.end === undefined)
          lastOfflineRange.end = DateTime.now()
      }
    }
  }


  private ConstructRanges(ranges: Array<TimeRange>, e: HTMLDivElement, date: DateTime) {
    // hh:mm - hh:mm (?<hours>\d\d):(?<minutes>\d\d)
    var timeRangeRegex = /(?<begin>\d\d:\d\d)?.* - (?<end>\d\d:\d\d)?.*/;
    var timeHHMMRange = /(?<hour>\d\d):(?<minute>\d\d)/;
    var range = e.children[0].textContent?.match(timeRangeRegex)?.groups as Range;

    var beginTime = range?.begin?.match(timeHHMMRange)?.groups as unknown as Time;
    if (beginTime != undefined) {
      beginTime.year = date.year;
      beginTime.month = date.month;
      beginTime.day = date.day;
    }
    var begin = beginTime != undefined ? DateTime.fromObject(beginTime) : undefined;

    var endTime = range?.end?.match(timeHHMMRange)?.groups as unknown as Time;
    if (endTime != undefined) {
      endTime.year = date.year;
      endTime.month = date.month;
      endTime.day = date.day;
    }
    var end = endTime != undefined ? DateTime.fromObject(endTime) : undefined;

    if (begin != undefined && end != undefined && end?.toSeconds() < begin?.toSeconds()) {
      end = end.plus({ days: 1 });
      console.log(begin.toString(), end.toString());
    }


    if (begin != undefined || end != undefined)
      ranges.push(new TimeRange(begin, end));
  }

  private static ComputeDuration(ranges: DayInfo[], selector: (d: DayInfo) => Duration) {
    var duration = Duration.fromMillis(0)
    ranges.forEach((day) => {
      duration = duration.plus(selector(day))
    })
    return duration;
  }
}
