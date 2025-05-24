import { DateTime } from "luxon";
export class TimeRange {
  public begin: DateTime | undefined;
  public end: DateTime | undefined;

  public constructor(begin?: DateTime | undefined, end?: DateTime | undefined) {
    this.begin = begin;
    this.end = end;
  }

  public get diff() {
    return this.begin != undefined && this.end != undefined
      ? this.end.diff(this.begin)
      : undefined;
  }

  public static compare(leftRange: TimeRange, rightRange: TimeRange) {
    if (leftRange.begin !== undefined && rightRange.begin !== undefined) {
      return leftRange.begin.diff(rightRange.begin).toMillis();
    }
    if (leftRange.begin === undefined && rightRange.begin !== undefined) {
      return 1;
    }
    if (leftRange.begin !== undefined && rightRange.begin === undefined) {
      return -1;
    }
    if (leftRange.begin === undefined && rightRange.begin === undefined) {
      if (leftRange.end === undefined) return 1;
      if (rightRange.end === undefined) return -1;
      if (leftRange.end === undefined && rightRange.end === undefined) return 0;
      return leftRange.end.diff(rightRange.end).toMillis();
    }
    return 0;
  }

  /**
   * Проверка двух диапазонов на пересечение
   */
  public static RangeCollision(left: TimeRange, right: TimeRange) {
    if (left === undefined || right === undefined) return false;

    if (
      (left.begin === undefined && left.end === undefined) ||
      (right.begin === undefined && right.end === undefined)
    )
      return true;

    if (
      (left.begin === undefined && right.begin === undefined) ||
      (left.end === undefined && right.end === undefined)
    )
      return true;

    if (
      (left.begin === undefined && left.end === undefined) ||
      (right.begin === undefined && right.end === undefined)
    )
      return true;

    if (
      left.begin === undefined &&
      left.end !== undefined &&
      right.end === undefined &&
      right.begin !== undefined
    )
      return left.end.diff(right.begin).toMillis() >= 0;

    if (
      left.begin !== undefined &&
      left.end === undefined &&
      right.begin === undefined &&
      right.end !== undefined
    )
      return right.end.diff(left.begin).toMillis() >= 0;

    if (
      left.begin !== undefined &&
      left.end !== undefined &&
      right.begin !== undefined &&
      right.end !== undefined
    ) {
      return (
        (left.end.diff(right.begin).toMillis() >= 0 &&
          left.begin.diff(right.end).toMillis() < 0) ||
        (right.end.diff(left.begin).toMillis() >= 0 &&
          right.begin.diff(left.end).toMillis() < 0)
      );
    }

    return false;
  }

  /**
   * Объединение двух диапазонов
   */
  public static Merge(left: TimeRange, right: TimeRange) {
    var range = new TimeRange();

    if (left === undefined && right === undefined) return range;
    if (left === undefined && right !== undefined) return right;
    if (right === undefined && left !== undefined) return left;

    if (left.begin === undefined && right.begin !== undefined)
      range.begin = right.begin;
    if (right.begin === undefined && left.begin !== undefined)
      range.begin = left.begin;
    if (right.begin !== undefined && left.begin !== undefined)
      range.begin =
        left.begin.diff(right.begin).toMillis() < 0 ? left.begin : right.begin;

    if (left.end === undefined && right.end !== undefined)
      range.end = right.end;
    if (right.end === undefined && left.end !== undefined) range.end = left.end;
    if (right.end !== undefined && left.end !== undefined)
      range.end =
        left.end.diff(right.end).toMillis() > 0 ? left.end : right.end;

    return range;
  }
}
