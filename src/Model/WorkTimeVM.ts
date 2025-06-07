import { MonthInfo } from "./MonthInfo";
import { Duration } from "luxon";
import { abs } from "../Utils/Formating";

export class WorkTimeVM {
  private _monthInfo: MonthInfo;
  private _userSNP: string;
  private _shortWorkInfoHTML: string;

  constructor(
    monthInfo: MonthInfo,
    userSNP: string,
    shortWorkInfoHTML: string
  ) {
    this._monthInfo = monthInfo;
    this._userSNP = userSNP;
    this._shortWorkInfoHTML = shortWorkInfoHTML;
  }

  get monthInfo() {
    return this._monthInfo;
  }

  get userSNP() {
    return this._userSNP;
  }

  get shortWorkInfoHTML() {
    return this._shortWorkInfoHTML;
  }

  get expectedOperating() {
    return Duration.fromObject({ hour: this.workingDaysCount * 8 });
  }

  get workingDaysCount() {
    return this._monthInfo.WorkingDaysToday.length;
  }

  get totalDelta() {
    return this._monthInfo.TotalWorkDuration.minus(this.expectedOperating);
  }

  get totalDeltaTimePrefix() {
    return this.totalDelta.toMillis() < 0 ? "Недоработка" : "Переработка";
  }

  get displayTotalDeltaTime() {
    return `${this.totalDeltaTimePrefix}: ${abs(this.totalDelta).toFormat(
      "hh:mm"
    )}`;
  }
}
