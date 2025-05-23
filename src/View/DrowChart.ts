import { Chart, TooltipItem } from "chart.js/auto";
import { DayInfo } from "../Model/DayInfo";
import { TimeRange } from "../Model/TimeRange";
import { DateTime, Duration } from "luxon";
import annotationPlugin from 'chartjs-plugin-annotation';
import "chartjs-adapter-luxon";

Chart.register(annotationPlugin);

export class DrowChart {
  private canvas: HTMLCanvasElement;
  private daysDate: DayInfo[];
  private gradient: CanvasGradient;

  constructor(canvas: HTMLCanvasElement, daysData: DayInfo[]) {
    this.canvas = canvas;
    this.daysDate = daysData;

    var ctx = this.canvas.getContext("2d")!;
    this.gradient = ctx.createLinearGradient(0, 0, 0, 400); // вертикальный градиент
    this.gradient.addColorStop(0, "rgb(210, 180, 140)"); // сверху — полупрозрачный зеленый
    this.gradient.addColorStop(1, "rgb(142, 194, 120)"); // снизу — прозрачный
  }

  private ranges(){
    var data: {y:(DateTime | undefined)[], x:(string | null)}[] = Array<{y:(DateTime | undefined)[], x:(string | null)}>()
    this.daysDate.forEach((day) => {
      day.mergedRanges.forEach(range => { 
        var r = {
          y: [range.begin?.minus(day.date.toMillis()), range.end?.minus(day.date.toMillis())],
          x: day.date.toISO(),
        }
        data.push(r)
      });
      
      var r = {
        y: [undefined, undefined],
        x: day.date.toISO(),
      }
      data.push(r)
    });
    return data;
  }

  public drow() {

    new Chart(this.canvas, {
      data: {
        datasets: [
          {
            type: "bar",
            label: "Время работы",
            data: this.ranges(),
            backgroundColor: this.gradient,
            borderColor: "rgb(116, 158, 98)",
            barPercentage: 1,
            order: 10,
            hidden: false,
          },
          {
            type: "line",
            label: "Рекомендуемый диапазон начала работы",
            data: undefined,
            backgroundColor: "rgba(100, 196, 58, 0.3)",
            borderWidth: 0,
            hidden: false,
          },
          {
            type: "line",
            label: "Рекомендуемый диапазон завершения работы",
            data: undefined,
            backgroundColor: "rgba(212, 136, 35, 0.3)",
            borderWidth: 0,
            hidden: false,
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
                day: "dd",
              },
              tooltipFormat: "DD",
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
        plugins: {
          annotation: {
            annotations: {
              box1: {
                type: "box",
                yMin: Duration.fromObject({ hour: 8 }).toMillis(),
                yMax: Duration.fromObject({ hour: 10 }).toMillis(),
                backgroundColor: "rgba(100, 196, 58, 0.3)",
                borderWidth: 0,
                drawTime: "beforeDraw",
              },

              box2: {
                type: "box",
                yMin: Duration.fromObject({ hour: 17 }).toMillis(),
                yMax: Duration.fromObject({ hour: 19 }).toMillis(),
                backgroundColor: "rgba(212, 136, 35, 0.3)",
                borderWidth: 0,
                drawTime: "beforeDraw",
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

                const startStr = start.toUTC().toFormat(
                  "HH:mm"
                );
                const endStr = end.toUTC().toFormat(
                  "HH:mm"
                );

                return ` ${context.dataset.label}: ${startStr} - ${endStr}`;
              },
            },
          },
        },
      },
    });
  }
}
