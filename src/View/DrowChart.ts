import { Chart } from "chart.js/auto";
import "chartjs-adapter-luxon";
import { DayInfo } from "../Model/DayInfo";
import { TimeRange } from "../Model/TimeRange";

export class DrowChart {
  private canvas: HTMLCanvasElement;
  private daysDate: DayInfo[];
  private gradient: CanvasGradient;

  static halfDayOffset = { hour: 12 };

  constructor(canvas: HTMLCanvasElement, daysData: DayInfo[]) {
    this.canvas = canvas;
    this.daysDate = daysData;

    var ctx = this.canvas.getContext("2d")!;
    this.gradient = ctx.createLinearGradient(0, 0, 0, 400); // вертикальный градиент
    this.gradient.addColorStop(0, "rgba(210, 180, 140, 0.75)"); // сверху — полупрозрачный зеленый
    this.gradient.addColorStop(1, "rgba(116, 158, 98, 0)"); // снизу — прозрачный
  }

  private daysStartWork() {
    var data = this.daysDate.map((day) => {
      var first: TimeRange | undefined = undefined;
      var ranges = day.mergedRanges;
      for (var i = 0; i < ranges.length; i++) {
        if (ranges[i].begin !== undefined) {
          first = ranges[i];
          break;
        }
      }

      return {
        y: first?.begin?.minus(day.date.toMillis()),
        x: day.date.plus(DrowChart.halfDayOffset).toISO(),
      };
    });
    return data;
  }

  private daysEndWork() {
    var data = this.daysDate.map((day) => {
      var last: TimeRange | undefined = undefined;
      var ranges = day.mergedRanges;
      for (var i = ranges.length - 1; i >= 0; i--) {
        if (ranges[i].end !== undefined) {
          last = ranges[i];
          break;
        }
      }

      return {
        y: last?.end?.minus(day.date.toMillis()),
        x: day.date.plus(DrowChart.halfDayOffset).toISO(),
      };
    });
    return data;
  }

  private recomendedStartWork() {
    var data = this.daysDate.map((day) => {
      return {
        y: day.date.plus({ hour: 10 }).minus(day.date.toMillis()),
        x: day.date.plus(DrowChart.halfDayOffset).toISO(),
      };
    });
    return data;
  }

  private recomendedEndWork() {
    var data = this.daysDate.map((day) => {
      return {
        y: day.date.plus({ hour: 17 }).minus(day.date.toMillis()),
        x: day.date.plus(DrowChart.halfDayOffset).toISO(),
      };
    });
    return data;
  }

  public drow() {
    new Chart(this.canvas, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Рекомендуемое начало рабочего дня",
            data: this.recomendedStartWork(),
            borderColor: "rgba(100, 196, 58, 0.3)",
            pointRadius: 0,
            pointHoverRadius: 0,
            pointHitRadius: 0,
          },
          {
            label: "Рекомендуемый конец рабочего дня",
            data: this.recomendedEndWork(),
            borderColor: "rgba(212, 136, 35, 0.3)",
            pointRadius: 0,
            pointHoverRadius: 0,
            pointHitRadius: 0,
          },
          {
            label: "Начало рабочего дня",
            data: this.daysStartWork(),
            fill: "+1",
            backgroundColor: this.gradient,
            borderColor: "rgb(116, 158, 98)",
            tension: 0.2,
          },
          {
            label: "Конец рабочего дня",
            data: this.daysEndWork(),
            fill: false,
            borderColor: "rgb(210, 180, 140)",
            tension: 0.2,
          },
        ],
      },
      options: {
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
                day: "dd.MM",
              },
            },
            title: {
              display: true,
              text: "Дата",
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
              display: true,
              text: "Время",
            },
          },
        },
      },
    });
  }
}
