import { DateTime } from "luxon";
import { waitForElm } from "./DOMUtils";
import { FormatTime } from "./Formating";
import { DayInfo } from "./Model/DayInfo";
import { TimeRange } from "./Model/TimeRange";

console.log("Hello user!");

function showConsoleTime(prefix: string, time: number) {
  var char = Math.sign(time) < 0 ? "-" : "";
  console.log(prefix + ": " + char + FormatTime(time));
}

function SetTimeInTotalToolTip(
  tooltip: HTMLDivElement,
  offline: number,
  online: number,
) {
  var offlineSpan = document.createElement("span");
  offlineSpan.setAttribute("style", "color: #aaa; font-size: 0.8em;");
  offlineSpan.textContent = ` (${FormatTime(Math.abs(offline))})`;
  tooltip.children[0].appendChild(offlineSpan);

  var onlineSpan = document.createElement("span");
  onlineSpan.setAttribute("style", "color: #aaa; font-size: 0.8em;");
  onlineSpan.textContent = ` (${FormatTime(Math.abs(online))})`;
  tooltip.children[1].appendChild(onlineSpan);
}

async function init() {
  var table = (await waitForElm("#MainDiv > table")) as HTMLTableElement;

  var rows = table.tBodies[0].rows;
  var workDays = new Array<DayInfo>;
  Array.from(rows).forEach((element, index) => {
    console.log('######## row ' + index + '########')
    Array.from(element.children).forEach((e)=>{
      if (e.children.length == 0) return;

      var element = e.children[0] as HTMLDivElement

      var cellContent = element.querySelector('a') as unknown as HTMLLinkElement
      if (cellContent == undefined) return
      var cellToolTips = element.children.length>1 ? element.children[1].children[0].querySelectorAll(".d-column") : undefined

      //console.log(cellToolTips)

      var offlineRangesSource = cellToolTips!=undefined && cellToolTips.length>0 ? Array.from(cellToolTips[0].children[1].children) as HTMLDivElement[] : undefined
      var onlineRangesSource = cellToolTips!=undefined && cellToolTips.length>1 ? Array.from(cellToolTips[1].children[1].children) as HTMLDivElement[] : undefined
      //console.log(cellContent)
      var number = Number(cellContent.children[0]?.textContent ?? cellContent.textContent)

      var offlineRanges = new Array<TimeRange>()
      var onlineRanges = new Array<TimeRange>()
      
      var ConstructRanges = (ranges:Array<TimeRange> ,e:HTMLDivElement) => {
        // hh:mm - hh:mm (?<hours>\d\d):(?<minutes>\d\d)
        type Range = {
          begin:string|undefined;
          end:string|undefined;
        }
        type Time = {
          hour:number;
          minute:number;
          day:number|undefined;
          month:number|undefined;
          year:number|undefined;
        }
        var timeRangeRegex = /(?<begin>\d\d:\d\d) - (?<end>\d\d:\d\d)/
        var timeHHMMRange = /(?<hour>\d\d)?.*:(?<minute>\d\d)/
        var range = e.children[0].textContent?.match(timeRangeRegex)?.groups as Range


        var beginTime = range?.begin?.match(timeHHMMRange)?.groups as unknown as Time
        if (beginTime != undefined) beginTime.day = number
        var begin = beginTime != undefined ? DateTime.fromObject(beginTime) : undefined

        var endTime = range?.end?.match(timeHHMMRange)?.groups as unknown as Time
        if (endTime != undefined) endTime.day = number
        var end = endTime != undefined ? DateTime.fromObject(endTime) : undefined

        if (begin != undefined && end != undefined && end?.toSeconds() < begin?.toSeconds())
        {
          end = end.plus({days: 1})
          console.log(begin.toString(), end.toString())
        }


        if (begin != undefined || end != undefined)
        ranges.push(new TimeRange(begin, end))
      }

      offlineRangesSource?.forEach((e)=>{ConstructRanges(offlineRanges, e)})
      onlineRangesSource?.forEach((e)=>{ConstructRanges(onlineRanges, e)})

      workDays.push(new DayInfo(number, offlineRanges, onlineRanges))
      console.log(offlineRanges)
      console.log(onlineRanges)
    })
  })
  console.log(workDays)
  console.log(workDays[0].offlineRanges[0].diff?.toFormat('hh:mm'))

  var workDaysTracker = await waitForElm("#MainDiv > .crm-tooltip");
  var totalWorkDayToolTip = (await waitForElm(
    "#MainDiv > .crm-tooltip > div",
  )) as HTMLDivElement;

  var offline = 0;
  var online = 0;
  var matches = (
    document.querySelector("#MainDiv") as HTMLDivElement
  ).textContent?.match(/(?<=из )\d+(?<!\))/);
  var worksDay = Number(matches?.[0]);
  var days = document.querySelectorAll(
    'td[name="day"] .crm-flex-container .crm-flex-child-middle:first-child',
  );

  days.forEach((element) => {
    if (
      element.children[2].children.length > 0 &&
      (element.children[2].children[0] as HTMLDivElement).innerText === "X"
    ) {
      worksDay--;
      return;
    }

    offline += Number(
      (element.children[0] as HTMLDivElement).innerText.replace(",", "."),
    );
    online += Number(
      (element.children[1] as HTMLDivElement).innerText.replace(",", "."),
    );
  });

  var totalWorkTime = offline + online;
  var totalDelta = totalWorkTime - worksDay * 8;
  var totalDeltaTimePrefix = totalDelta < 0 ? "Недоработка" : "Переработка";
  var avrOffline = offline / worksDay;
  var avrOnline = online / worksDay;

  showConsoleTime("Наработка общая", totalDelta);
  showConsoleTime("Наработка офлайн", offline);
  showConsoleTime("Наработка онлайн", online);
  showConsoleTime("Среднее на работе", avrOffline);
  showConsoleTime("Среднее удаленно", avrOnline);

  var totalDeltaElement = document.createElement("span");
  totalDeltaElement.textContent = `(${totalDeltaTimePrefix}: ${FormatTime(Math.abs(totalDelta))})`;
  totalDeltaElement.setAttribute("style", "color: #aaa; font-size: 0.8em;");

  workDaysTracker.appendChild(totalDeltaElement);
  SetTimeInTotalToolTip(totalWorkDayToolTip, offline, online);
}

init();
