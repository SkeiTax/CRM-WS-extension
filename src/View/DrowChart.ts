import {
  Chart,
  ChartData,
  ChartOptions,
  ChartType,
  TooltipItem,
} from "chart.js/auto";
import { DayInfo } from "../Model/DayInfo";
import { DateTime, Duration } from "luxon";
import annotationPlugin from "chartjs-plugin-annotation";
import "chartjs-adapter-luxon";
import { ManualSessionRange, ManualSessionType} from '../Model/ManualSessionRange'

Chart.register(annotationPlugin);

export class MainChart {
  private daysDate: DayInfo[];
  private lowerLimit: Duration;
  private upperLimit: Duration;
  private static spaceOffsetDuration: Duration = Duration.fromObject({
    hour: 1,
    minute: 10,
  });
  private static baseStart = Duration.fromObject({ hour: 10 });
  private static baseEnd = Duration.fromObject({ hour: 17 });

  constructor(daysData: DayInfo[]) {
    this.daysDate = daysData;

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

  private workedRanges() {
    var data: { y: (DateTime | undefined)[]; x: string | null }[] = Array<{
      y: (DateTime | undefined)[];
      x: string | null;
    }>();
    this.daysDate.forEach((day) => {
      day.mergedRanges.forEach((range) => {
        var r = {
          y: [
            range.begin?.minus(day.date.toMillis()),
            range.end?.minus(day.date.toMillis()),
          ],
          x: day.date.toISO(),
          total: day.duration
        };
        data.push(r);
      });

      var r = {
        y: [undefined, undefined],
        x: day.date.toISO(),
      };
      data.push(r);
    });
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
      });
  }

  private *breaksGenerator() {
    const workedDaysWithBreaks = this.daysDate.filter((day) => day.duration.toMillis() != 0 && day.mergedRanges.length > 1);
    for (var k = 0; k < workedDaysWithBreaks.length; k++) {
      const day = workedDaysWithBreaks[k];
      for (var i = 0; i < day.mergedRanges.length - 1; i++) {
        const currentRange = day.mergedRanges[i];
        const nextRange = day.mergedRanges[i + 1];
        if (nextRange.begin === undefined || currentRange.end === undefined) continue;
        yield {
          y: [
            currentRange.end?.minus(day.date.toMillis()),
            nextRange.begin?.minus(day.date.toMillis()),
          ],
          x: day.date.toISO(),
          total: day.duration
        };
      }
    }
  }

  private breaks() {
    return Array.from(this.breaksGenerator());
  }

  private get todayData(){
    const {year, month, day} = DateTime.now()
    return DateTime.fromObject({year: year, month: month, day: day})
  }

  private today() {
    return [{
      x: this.todayData.toISO(),
      y: [this.lowerLimit.toMillis(), this.upperLimit.toMillis()],
    }];
  }

  get type() {
    return undefined as unknown as ChartType;
  }
  get data() {
    return {
      datasets: [
        {
          type: "bar",
          label: "Время работы",
          data: this.workedRanges(),
          backgroundColor: "rgba(140, 192, 224, 1)",
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
          order: 5,
          hidden: !(this.daysDate[0].date.month === DateTime.now().month &&
                  this.daysDate[0].date.year  === DateTime.now().year),
        },
        {
          type: "bar",
          label: "Выходные",
          data: this.weekends(),
          backgroundColor: "rgba(225, 235, 242, 1)",
          categoryPercentage: 1.0,
          barPercentage: 0.95,
          order: 10,
          hidden: false,
        },
      ],
    } as ChartData;
  }

  get options(){
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
            display: false // ❌ отключить сетку по оси X
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
            display: false // ❌ отключить сетку по оси X
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
              drawTime: 'afterDatasetsDraw',
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
              raw: { y: [DateTime, DateTime], total: Duration };
              dataset: { label: any };
              datasetIndex: number;
            }) {
              const raw = context.raw as { y: [DateTime, DateTime], total: Duration };

              if (!Array.isArray(raw.y) || raw.y.length !== 2) {
                return "Invalid data";
              }

              const [start, end] = raw.y;
              
              if (start === undefined || end === undefined) return undefined

              const startStr = start.toUTC().toFormat("HH:mm");
              const endStr = end.toUTC().toFormat("HH:mm");
              const diff = end.diff(start).toFormat("h:mm");

              var out: string = '';
              out = ` ${context.dataset.label}${context.datasetIndex === 0 ? raw.total?.toFormat(' (h:mm)') ?? "" : ""}: ${startStr} - ${endStr} (${diff})`

              return out;
            },
          },
          filter: function (tooltipItem: { datasetIndex: number }) {
            return tooltipItem.datasetIndex === 0 || tooltipItem.datasetIndex === 1; // отключить тултип для второго набора
          },
        },
      },
      onClick: (event, elements) => {
        if (elements.length > 0) {
          const element = elements[0]; // Первый найденный элемент
          const datasetIndex = element.datasetIndex; // Индекс датасета
          const dataIndex = element.index; // Индекс элемента внутри датасета
          if (element.datasetIndex === 1){
            const value = this.breaks()[element.index] as {x:string, y: DateTime[]}
            const date = DateTime.fromISO(value.x)
            const start = value.y[0].plus(date.toMillis())
            const end = value.y[1].plus(date.toMillis())
            const manualSessionRange = new ManualSessionRange(start, end, ManualSessionType.manual)
            console.log('Clicked on bar: datasetIndex =', datasetIndex, ',dataIndex =', dataIndex, ', value =', value, ', manualSessionRange =', manualSessionRange);
          }
        }
      },
    } as ChartOptions;
  }
}
