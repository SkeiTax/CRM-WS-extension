import { DateTime, Duration } from "luxon";
import { TimeRange } from "./TimeRange";
import { Session } from "./Session";

export class DayInfo {
  public number: number;
  public date: DateTime;
  public sessions: Session[];
  public isWeekend: boolean;
  public breakDuration: Duration;

  public constructor(
    date: DateTime,
    sessions: Session[],
    breakDuration: Duration,
    isWeekend: boolean
  ) {
    this.date = date;
    this.number = date.day;
    this.sessions = sessions;
    this.breakDuration = breakDuration;
    this.isWeekend = isWeekend;
  }

  // public get offline() {
  //   return this.ComputDurationFromRange(this.offlineRanges)
  // }

  // public get online() {
  //   return this.ComputDurationFromRange(this.onlineRanges)
  // }

  private _margedRanges?: TimeRange[];

  /**
   * Объедененные диапазоны работы всех сессий
   */
  public get mergedRanges(): TimeRange[] {
    if (this._margedRanges !== undefined) return this._margedRanges;

    this._margedRanges = this.margeRanges().sort(TimeRange.compare);
    return this._margedRanges;
  }

  private _duration?: Duration;

  /**
   * Продолжительность рабочего дня
   */
  public get duration(): Duration {
    if (this._duration !== undefined) return this._duration;

    this._duration = this.colculateDuration();
    return this._duration;
  }

  /**
   * Объединение всех сессий в одину последовательность диапазонов работы
   */
  private margeRanges() {
    var ranges: TimeRange[] = [];

    var indexInSessions: number[] = this.sessions.map((_) => 0);

    const isNotEnd = () => {
      return (
        this.sessions.find(
          (session, sessionIndex) =>
            indexInSessions[sessionIndex] < session.closedRanges.length
        ) !== undefined
      );
    };

    const findNextSessionIndex = () => {
      if (this.sessions.length < 2) return 0;
      var startRanges = this.sessions.map(
        (session, sessionIndex) => session.closedRanges[indexInSessions[sessionIndex]]
      );
      var sortedRanges = Array.from(startRanges).sort(TimeRange.compare);
      var index = startRanges.findIndex((range) => range == sortedRanges[0]);
      return index;
    };

    while (isNotEnd()) {
      var range = new TimeRange();
      //var currentSessionIndex = findStartSessionIndex();
      while (isNotEnd()) {
        var currentSessionIndex = findNextSessionIndex();
        if (
          !TimeRange.RangeCollision(
            range,
            this.sessions[currentSessionIndex].closedRanges[
              indexInSessions[currentSessionIndex]
            ]
          )
        ) {
          break;
        }

        if (
          currentSessionIndex === this.sessions.length ||
          currentSessionIndex === -1
        )
          break;

        range = TimeRange.Merge(
          range,
          this.sessions[currentSessionIndex].closedRanges[
            indexInSessions[currentSessionIndex]
          ]
        );
        indexInSessions[currentSessionIndex]++;
      }

      ranges.push(range);
    }
    return ranges.filter(
      (range) => range.begin !== undefined && range.end !== undefined
    );
  }

  /**
   * Расчет продолжительности рабочего дня
   */
  private colculateDuration() {
    var duration = Duration.fromMillis(0);
    this.mergedRanges.forEach((range) => {
      var _diff = range.diff;
      if (_diff != undefined) duration = duration.plus(_diff);
    });

    if (this.takeBreak()) duration = duration.minus(this.breakDuration);

    return duration;
  }

  /**
   * Проверяет нужно ли учитывать перервыв при расчетах продолжительности
   */
  private takeBreak() {
    for (var i = 0; i < this.mergedRanges.length - 1; i++) {
      var current = this.mergedRanges[i];
      var next = this.mergedRanges[i + 1];
      if (current.end === undefined || next.begin === undefined) continue;
      var breakDuration = next.begin.diff(current.end);
      if (
        breakDuration.plus({ minute: 1 }).toMillis() >=
        this.breakDuration.toMillis()
      )
        return false;
    }
    return true;
  }
}
