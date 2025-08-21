import { DateTime, Duration } from "luxon";
import { DayInfo } from "./DayInfo";
import { Range } from "../Domain/Range";
import { Time } from "../Domain/Time";
import { TimeRange } from "./TimeRange";
import { Session } from "./Session";

export class MonthInfo {
  public days: DayInfo[] = [];
  private _table: HTMLTableElement;
  private filterDate: DateTime;

  // public get OfflineWorkDuration(): Duration {
  //   return MonthInfo.ComputeDuration(this.days, (d) => { return d.offline });
  // }
  // public get OnlineWorkDuration(): Duration {
  //   return MonthInfo.ComputeDuration(this.days, (d) => { return d.online });
  // }

  /**
   * Общая продолжительность работы в месяце
   */
  public get TotalWorkDuration(): Duration {
    return MonthInfo.ComputeDuration(this.days, (d) => {
      return d.duration;
    });
  }

  public get DeltaWorkTime() {
    return Duration.fromObject({
      hour: 8 * this.WorkingDaysToday.length,
    }).minus(this.TotalWorkDuration);
  }

  /**
   * Рабочие дни в месяце
   */
  public get WorkingDays(): DayInfo[] {
    return this.days.filter((day) => !day.isWeekend);
  }

  /**
   * Рабочие дни в месяце до сегодняшнего дня
   */
  public get WorkingDaysToday(): DayInfo[] {
    if (this.filterDate.month != DateTime.now().month) return this.WorkingDays;
    return this.days.filter(
      (day) => !day.isWeekend && day.date.diff(DateTime.now()).toMillis() < 0
    );
  }

  /**
   * Отработанные дни
   */
  public get DaysWorked(): DayInfo[] {
    return this.days.filter((day) => day.duration.toMillis() != 0);
  }

  constructor(table: HTMLTableElement, filterDate: DateTime) {
    this._table = table;
    this.filterDate = filterDate;
    var dayCells = this._table.querySelectorAll("div.crm-tooltip");
    //console.log(dayCells)
    Array.from(dayCells).forEach((element) => {
      if (element.children.length == 0) return;

      //var element = e.children[0] as HTMLDivElement;

      var isWeekend =
        (element.parentElement as HTMLElement).style.background ==
        "rgb(255, 210, 173)";

      var cellContent = element.querySelector(
        "a"
      ) as unknown as HTMLLinkElement;
      if (cellContent == undefined) return;

      var date = DateTime.fromObject({
        year: filterDate.year,
        month: filterDate.month,
        day: Number(
          cellContent.children[0]?.textContent ?? cellContent.textContent
        ),
      });

      var sessions = element.querySelectorAll("div.ai-start:has(div+div)");
      //console.log(sessions)

      var sessionsData = new Array<Session>();
      sessions.forEach((session) => {
        var source = session.children[0].textContent ?? "";
        var type = session.children[1].children[0].getAttribute("title") ?? "";
        var sessionSourceRanges = Array.from(session.children[1].children);
        var sessionRanges = new Array<TimeRange>();
        sessionSourceRanges.forEach((e) => {
          this.ConstructRanges(sessionRanges, e as HTMLElement, date);
        });
        sessionsData.push(new Session(source, type, sessionRanges));
      });

      var breakDuration = Duration.fromMillis(0);

      var divs = element.querySelectorAll("div.ai-start");
      isWeekend = isWeekend || ((divs.length > 0 && (divs[0] as HTMLElement).textContent?.includes("Отпуск")) ?? false)
      if (
        divs.length > 0 &&
        ((divs[divs.length - 1] as HTMLElement).textContent?.includes(
          "Обед:"
        ) ??
          false)
      ) {
        var match = (
          (divs[divs.length - 1] as HTMLElement).textContent as string
        ).match(/\d+/g)?.[0];
        if (match === null) return;
        breakDuration = Duration.fromObject({ minute: Number(match) });
      }

      this.days.push(new DayInfo(date, sessionsData, breakDuration, isWeekend));
    });

    if (filterDate.month == DateTime.now().month) {
      var cday = this.days.findLast((day) => day.number == DateTime.now().day);
      if (cday != undefined) {
        cday.sessions.forEach((session) => {
          if (session.ranges === undefined || session.ranges.length === 0) return;
          if (session.ranges[session.ranges.length - 1].end === undefined) {
            session.ranges[session.ranges.length - 1].end = DateTime.now();
          }
        });
      }
    }
  }

  private ConstructRanges(
    ranges: Array<TimeRange>,
    e: HTMLElement,
    date: DateTime
  ) {
    // hh:mm - hh:mm (?<hours>\d\d):(?<minutes>\d\d)
    var timeRangeRegex = /(?<begin>\d\d:\d\d)?.* - (?<end>\d\d:\d\d)?.*/;
    var timeHHMMRange = /(?<hour>\d\d):(?<minute>\d\d)/;
    var range = e.children[0].textContent?.match(timeRangeRegex)
      ?.groups as Range;

    if (range === undefined) return;

    var beginTime = range.begin?.match(timeHHMMRange)
      ?.groups as unknown as Time;
    if (beginTime != undefined) {
      beginTime.year = date.year;
      beginTime.month = date.month;
      beginTime.day = date.day;
    }
    var begin =
      beginTime != undefined ? DateTime.fromObject(beginTime) : undefined;

    var endTime = range.end?.match(timeHHMMRange)?.groups as unknown as Time;
    if (endTime != undefined) {
      endTime.year = date.year;
      endTime.month = date.month;
      endTime.day = date.day;
    }
    var end = endTime != undefined ? DateTime.fromObject(endTime) : undefined;

    if (
      begin != undefined &&
      end != undefined &&
      end?.toSeconds() < begin?.toSeconds()
    ) {
      end = end.plus({ days: 1 });
    }

    if (begin != undefined || end != undefined)
      ranges.push(new TimeRange(begin, end));
  }

  private static ComputeDuration(
    ranges: DayInfo[],
    selector: (d: DayInfo) => Duration
  ) {
    var duration = Duration.fromMillis(0);
    ranges.forEach((day) => {
      duration = duration.plus(selector(day));
    });
    return duration;
  }
}
