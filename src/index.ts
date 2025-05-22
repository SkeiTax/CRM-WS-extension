import { DateTime, Duration } from "luxon";
import { waitForElm } from "./DOMUtils";
import { abs } from "./Formating";
import { MonthInfo as MonthInfo } from "./Model/MonthInfo";
import { DrowChart } from "./View/DrowChart";
console.log("Hello user!");

function GetFilterDate() {
  return DateTime.fromObject({
    year: Number((document.querySelector("#Year") as HTMLSelectElement).value),
    month: Number(
      (document.querySelector("#Month") as HTMLSelectElement).value
    ),
  });
}

class CRME {
  public monthInfo?: MonthInfo;

  constructor() {}

  public async init() {
    var table = (await waitForElm("#MainDiv > table")) as HTMLTableElement;
    var filterDate = GetFilterDate();

    this.monthInfo = new MonthInfo(table, filterDate);

    var workDaysTracker = await waitForElm("#MainDiv > .crm-tooltip");

    var workingDaysCount = this.monthInfo.WorkingDaysToday.length;

    var expectedOperating = Duration.fromObject({ hour: workingDaysCount * 8 });

    var totalDelta = this.monthInfo.TotalWorkDuration.minus(expectedOperating);

    var totalDeltaTimePrefix =
      totalDelta.toMillis() < 0 ? "Недоработка" : "Переработка";

    console.log(totalDeltaTimePrefix, abs(totalDelta).toFormat("hh:mm"));
    console.log(DateTime.now().zone);

    var totalDeltaElement = document.createElement("span");
    totalDeltaElement.textContent = `(${totalDeltaTimePrefix}: ${abs(
      totalDelta
    ).toFormat("hh:mm")})`;
    totalDeltaElement.setAttribute("style", "color: #aaa; font-size: 0.8em;");

    workDaysTracker.appendChild(totalDeltaElement);

    var chartDiv = document.createElement("div") as HTMLDivElement;
    chartDiv.setAttribute("style", "width: 800px; height: 400px;");
    var canvas = document.createElement("canvas") as HTMLCanvasElement;
    chartDiv.appendChild(canvas);

    (await waitForElm("#MainDiv")).append(chartDiv);

    new DrowChart(canvas, this.monthInfo.days).drow();
  }

  public dump = () => {
    return JSON.stringify(this.monthInfo);
  };
}

async function init() {
  const filter = (await waitForElm("#filtersRow")) as HTMLDivElement;
  var crme = new CRME();

  filter.addEventListener("change", (event: Event) => {
    const target = event.target as HTMLSelectElement;
    if (target && target.tagName === "SELECT") {
      crme.init();
  	  console.log(crme);
    }
  });
  
  crme.init();
  console.log(crme);

  window.addEventListener("message", (event) => {
    if (event.source !== window) return;
    if (event.data.type === "CRMEDump_CALL") {
      console.log("Method called via postMessage");
      console.log(crme.dump());
      // можно ответить
      window.postMessage({ type: "CRMEDump_RESPONSE", data: "ok" }, "*");
    }
  });
}

init();
