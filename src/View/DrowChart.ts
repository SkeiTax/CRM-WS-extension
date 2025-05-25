import { Chart, TooltipItem } from "chart.js/auto";
import { DayInfo } from "../Model/DayInfo";
import { DateTime, Duration } from "luxon";
import annotationPlugin from "chartjs-plugin-annotation";
import "chartjs-adapter-luxon";

Chart.register(annotationPlugin);

export class DrowChart {
  private canvas: HTMLCanvasElement;
  private daysDate: DayInfo[];
  private lowerLimit: Duration;
  private upperLimit: Duration;
  private static spaceOffsetDuration: Duration = Duration.fromObject({
    hour: 1,
    minute: 10,
  });
  private static baseStart = Duration.fromObject({ hour: 10 });
  private static baseEnd = Duration.fromObject({ hour: 17 });

  constructor(canvas: HTMLCanvasElement, daysData: DayInfo[]) {
    this.canvas = canvas;
    this.daysDate = daysData;

    var minRange = this.daysDate
      .filter((day) => day.duration.toMillis() > 0)
      .map((day) => day.mergedRanges[0].begin?.diff(day.date))
      .sort()[0];
    this.lowerLimit = (minRange ?? DrowChart.baseStart).minus(
      DrowChart.spaceOffsetDuration
    );

    var maxRange = this.daysDate
      .filter((day) => day.duration.toMillis() > 0)
      .map((day) =>
        day.mergedRanges[day.mergedRanges.length - 1].end?.diff(day.date)
      )
      .filter((dur) => dur !== undefined)
      .sort((l, r) => r.minus(l).toMillis())[0];
    this.upperLimit = (maxRange ?? DrowChart.baseEnd).plus(
      DrowChart.spaceOffsetDuration
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

  weekends(): unknown {
    return this.daysDate
      .filter((day) => day.isWeekend)
      .map((day) => {
        return {
          x: day.date.toISO(),
          y: [this.lowerLimit.toMillis(), this.upperLimit.toMillis()],
        };
      });
  }

  public drow() {
    new Chart(this.canvas, {
      data: {
        datasets: [
          {
            type: "bar",
            label: "Время работы",
            data: this.workedRanges(),
            backgroundColor: "rgba(140, 192, 224, 1)",
            barPercentage: 1,
            order: 10,
            hidden: false,
          },
          {
            type: "bar",
            label: "Выходные",
            data: this.weekends(),
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            categoryPercentage: 1.0,
            barPercentage: 1.0,
            order: -1,
            hidden: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
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
          },
        },
        plugins: {
          annotation: {
            annotations: {
              startLine: {
                type: "line",
                yMin: DrowChart.baseStart.toMillis(),
                yMax: DrowChart.baseStart.toMillis(),
                borderColor: "rgba(76, 175, 80, 1)",
                borderWidth: 3,
                drawTime: "beforeDraw",
              },

              endLine: {
                type: "line",
                yMin: DrowChart.baseEnd.toMillis(),
                yMax: DrowChart.baseEnd.toMillis(),
                borderColor: "rgba(76, 175, 80, 1)",
                borderWidth: 3,
                drawTime: "beforeDraw",
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
                drawTime: "afterDraw",
              },
            },
          },

          legend: {
            onClick: () => {},
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const raw = context.raw as { y: [DateTime, DateTime] };

                if (!Array.isArray(raw.y) || raw.y.length !== 2) {
                  return "Invalid data";
                }

                const [start, end] = raw.y;

                const startStr = start.toUTC().toFormat("HH:mm");
                const endStr = end.toUTC().toFormat("HH:mm");
                const diff = end.diff(start).toFormat("h:mm")

                return ` ${context.dataset.label}: ${startStr} - ${endStr} (${diff})`;
              },
            },
            filter: function (tooltipItem) {
              // tooltipItem.datasetIndex — индекс набора данных
              return tooltipItem.datasetIndex !== 1; // отключить тултип для второго набора
            },
          },
        },
      },
    });
  }
}
