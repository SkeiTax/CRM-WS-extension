import {
  Chart,
  ChartData,
  ChartOptions,
  ChartType,
  Color,
  ScriptableContext,
  TooltipItem,
} from "chart.js/auto";
import { DayInfo } from "./DayInfo";
import { DateTime, Duration } from "luxon";
import annotationPlugin from "chartjs-plugin-annotation";
import "chartjs-adapter-luxon";
import {
  ManualSessionRange,
  ManualSessionType,
} from "./ManualSessionRange";
import { CanvasUtils } from "../Utils/CanvasUtils";
import { AnyObject } from "chart.js/dist/types/basic";
import { IHasBackground } from "../Interfaces/IHasBackground";
import { MonthInfo } from "./MonthInfo";

Chart.register(annotationPlugin);

export class MainChart {
  private monthInfo: MonthInfo;
  private lowerLimit: Duration;
  private upperLimit: Duration;
  private static spaceOffsetDuration: Duration = Duration.fromObject({
    hour: 1,
    minute: 10,
  });
  private static baseStart = Duration.fromObject({ hour: 10 });
  private static baseEnd = Duration.fromObject({ hour: 17 });

  constructor(monthInfo: MonthInfo) {
    this.monthInfo = monthInfo;

    var minRange = this.daysDate
      .filter((day) => day.duration.toMillis() > 0)
      .map((day) => day.mergedRanges[0].begin?.diff(day.date))
      .sort()[0];
    this.lowerLimit = (minRange ?? MainChart.baseStart).minus(
      MainChart.spaceOffsetDuration
    );

    var maxRange = this.daysDate
      .filter((day) => day.duration.toMillis() > 0)
      .map((day) =>
        day.mergedRanges[day.mergedRanges.length - 1].end?.diff(day.date)
      )
      .filter((dur) => dur !== undefined)
      .sort((l, r) => r.minus(l).toMillis())[0];
    this.upperLimit = (maxRange ?? MainChart.baseEnd).plus(
      MainChart.spaceOffsetDuration
    );
  }

  private get daysDate(){
    return this.monthInfo.days;
  }

  private workedRanges(ctx: CanvasRenderingContext2D) {
    var data: { y: (DateTime | undefined)[]; x: string | null; total: Duration; background: string | CanvasPattern | null }[] = [];

    this.monthInfo.DaysWorked.forEach((day) => {
      day.mergedRanges.forEach((range) => {
        var r = {
          y: [
            range.begin?.minus(day.date.toMillis()),
            range.end?.minus(day.date.toMillis()),
          ],
          x: day.date.toISO(),
          total: day.duration,
          background: "rgba(140, 192, 224, 1)",
        };
        data.push(r);
      });
    });

    if (this.monthInfo.DeltaWorkTime.toMillis()>0)
    {
      var lastWorkedDay = this.monthInfo.DaysWorked[this.monthInfo.DaysWorked.length - 1]
      var ms = Duration.fromMillis(Math.min(
        this.monthInfo.DeltaWorkTime.toMillis(), 
        Duration.fromObject({hour: 8}).minus(lastWorkedDay.duration).toMillis()
      ))

      const begin = DateTime.now()?.minus(this.todayData.toMillis())
      const end = begin.plus(ms)
      data.push({
        x: this.todayData.toISO(),
        y: [
            begin,
            end
          ],
        total: ms,
        background: CanvasUtils.createDiagonalStripePattern(ctx, 'rgba(140, 192, 224, 1)', 20, 0.5)
      })
    }
    return data;
  }

  private weekends(): unknown {
    return this.daysDate
      .filter((day) => day.isWeekend)
      .map((day) => {
        return {
          x: day.date.toISO(),
          y: [this.lowerLimit.toMillis(), this.upperLimit.toMillis()],
        };
      })
      .concat([
        {
          x: this.daysDate[this.daysDate.length - 1].date.toISO(),
          y: [this.upperLimit.toMillis(), this.upperLimit.toMillis()],
        },
      ]);
  }

  private *breaksGenerator() {
    const workedDaysWithBreaks = this.daysDate.filter(
      (day) => day.duration.toMillis() != 0 && day.mergedRanges.length > 1
    );
    for (var k = 0; k < workedDaysWithBreaks.length; k++) {
      const day = workedDaysWithBreaks[k];
      for (var i = 0; i < day.mergedRanges.length - 1; i++) {
        const currentRange = day.mergedRanges[i];
        const nextRange = day.mergedRanges[i + 1];
        if (nextRange.begin === undefined || currentRange.end === undefined)
          continue;
        yield {
          y: [
            currentRange.end?.minus(day.date.toMillis()),
            nextRange.begin?.minus(day.date.toMillis()),
          ],
          x: day.date.toISO(),
          total: day.duration,
        };
      }
    }
  }

  private breaks() {
    return Array.from(this.breaksGenerator());
  }

  private get todayData() {
    const { year, month, day } = DateTime.now();
    return DateTime.fromObject({ year: year, month: month, day: day });
  }

  private today() {
    return [
      {
        x: this.todayData.toISO(),
        y: [this.lowerLimit.toMillis(), this.upperLimit.toMillis()],
      },
    ];
  }

  get type() {
    return undefined as unknown as ChartType;
  }

  backgroundColorFactory:((ctx: ScriptableContext<"bar">, options: AnyObject) => Color | undefined) = (context) => {
    const bar = context.raw as IHasBackground
    return bar.background
  };

  datasets(){
    const datesets = []
  }

  data = (canvasContext: CanvasRenderingContext2D) => {
    return {
      datasets: [
        {
          type: "bar",
          label: "Время работы",
          data: this.workedRanges(canvasContext),
          backgroundColor: this.backgroundColorFactory,
          barPercentage: 1,
          order: -10,
          hidden: false,
        },
        {
          type: "bar",
          label: "Перерыв",
          data: this.breaks(),
          backgroundColor: "rgb(247, 239, 173)",
          barPercentage: 1,
          order: -9,
          hidden: false,
        },
        {
          type: "bar",
          label: "Сегодня",
          data: this.today(),
          backgroundColor: "rgba(225, 246, 205, 1)",
          categoryPercentage: 1.0,
          barPercentage: 0.95,
          order: 99,
          hidden: !(
            this.daysDate[0].date.month === DateTime.now().month &&
            this.daysDate[0].date.year === DateTime.now().year
          ),
        },
        {
          type: "bar",
          label: "Выходные",
          data: this.weekends(),
          backgroundColor: "rgba(225, 235, 242, 1)",
          categoryPercentage: 1.0,
          barPercentage: 0.95,
          order: 100,
          hidden: false,
        },
      ],
    } as ChartData;
  };

  options = (canvasContext: CanvasRenderingContext2D) => {
    return {
      maintainAspectRatio: false,
      //responsive: false,
      scales: {
        x: {
          adapters: {
            date: {
              zone: "UTC+3",
              setZone: true,
            },
          },
          type: "time",
          time: {
            unit: "day",
            displayFormats: {
              day: "dd",
            },
            tooltipFormat: "DD",
          },
          title: {
            display: false,
            text: "Дата",
          },
          stacked: true,
          grid: {
            display: false, // ❌ отключить сетку по оси X
          },
        },
        y: {
          adapters: {
            date: {
              zone: "UTC",
              setZone: true,
            },
          },
          type: "time",
          time: {
            unit: "hour",
            displayFormats: {
              hour: "HH:mm",
            },
            tooltipFormat: "HH:mm",
          },
          title: {
            display: false,
            text: "Время",
          },
          min: this.lowerLimit.toMillis(),
          max: this.upperLimit.toMillis(),
          grid: {
            display: false, // ❌ отключить сетку по оси X
          },
        },
      },
      plugins: {
        annotation: {
          annotations: {
            startLine: {
              type: "line",
              yMin: MainChart.baseStart.toMillis(),
              yMax: MainChart.baseStart.toMillis(),
              borderColor: "rgba(76, 175, 80, 1)",
              borderWidth: 1,
              drawTime: "afterDatasetsDraw",
            },

            endLine: {
              type: "line",
              yMin: MainChart.baseEnd.toMillis(),
              yMax: MainChart.baseEnd.toMillis(),
              borderColor: "rgba(76, 175, 80, 1)",
              borderWidth: 1,
              drawTime: "afterDatasetsDraw",
            },

            nowLine: {
              type: "line",
              yMin: DateTime.now()
                .diff(DateTime.fromObject({ hour: 0 }))
                .toMillis(),
              yMax: DateTime.now()
                .diff(DateTime.fromObject({ hour: 0 }))
                .toMillis(),
              borderColor: "rgba(234, 56, 56, 1)",
              borderWidth: 1,
              drawTime: "afterDatasetsDraw",
            },
          },
        },

        legend: {
          onClick: () => {},
        },
        tooltip: {
          callbacks: {
            label: function (context: {
              raw: { y: [DateTime, DateTime]; total: Duration };
              dataset: { label: any };
              datasetIndex: number;
            }) {
              const raw = context.raw as {
                y: [DateTime, DateTime];
                total: Duration;
              };

              if (!Array.isArray(raw.y) || raw.y.length !== 2) {
                return "Invalid data";
              }

              const [start, end] = raw.y;

              if (start === undefined || end === undefined) return undefined;

              const startStr = start.toUTC().toFormat("HH:mm");
              const endStr = end.toUTC().toFormat("HH:mm");
              const diff = end.diff(start).toFormat("h:mm");

              var out: string = "";
              out = ` ${context.dataset.label}${
                context.datasetIndex === 0
                  ? raw.total?.toFormat(" (h:mm)") ?? ""
                  : ""
              }: ${startStr} - ${endStr} (${diff})`;

              return out;
            },
          },
          filter: function (tooltipItem: { datasetIndex: number }) {
            return (
              tooltipItem.datasetIndex === 0 || tooltipItem.datasetIndex === 1
            ); // отключить тултип для второго набора
          },
        },
      },
      onClick: (event, elements) => {
        if (elements.length > 0) {
          const element = elements[0]; // Первый найденный элемент
          const datasetIndex = element.datasetIndex; // Индекс датасета
          const dataIndex = element.index; // Индекс элемента внутри датасета
          if (element.datasetIndex === 1) {
            const value = this.breaks()[element.index] as {
              x: string;
              y: DateTime[];
            };
            const date = DateTime.fromISO(value.x);
            const start = value.y[0].plus(date.toMillis());
            const end = value.y[1].plus(date.toMillis());
            const manualSessionRange = new ManualSessionRange(
              start,
              end,
              ManualSessionType.manual
            );
            console.log(
              "Clicked on bar: datasetIndex =",
              datasetIndex,
              ",dataIndex =",
              dataIndex,
              ", value =",
              value,
              ", manualSessionRange =",
              manualSessionRange
            );
          }
        }
      },
    } as ChartOptions;
  };
}
