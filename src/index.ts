import { DateTime, Duration } from "luxon";
import { waitForElm } from "./DOMUtils";
import { abs} from "./Formating";
import { MonthInfo as MonthInfo } from "./Model/MonthInfo";

console.log("Hello user!");

function SetTimeInTotalToolTip(
	tooltip: HTMLDivElement,
	offline: Duration,
	online: Duration,
) {
	var offlineSpan = document.createElement("span");
	offlineSpan.setAttribute("style", "color: #aaa; font-size: 0.8em;");
	offlineSpan.textContent = ` (${offline.toFormat("hh:mm")})`;
	tooltip.children[0].appendChild(offlineSpan);

	var onlineSpan = document.createElement("span");
	onlineSpan.setAttribute("style", "color: #aaa; font-size: 0.8em;");
	onlineSpan.textContent = ` (${online.toFormat("hh:mm")})`;
	tooltip.children[1].appendChild(onlineSpan);
}

function GetFilterDate(){
	return DateTime.fromObject({
		year: Number((document.querySelector('#Year') as HTMLSelectElement).value),
		month: Number((document.querySelector('#Month') as HTMLSelectElement).value)
	})
}

async function init() {
	var table = (await waitForElm("#MainDiv > table")) as HTMLTableElement;
	var filterDate = GetFilterDate()

	var monthInfo = new MonthInfo(table, filterDate)

	// try {
	// 	console.log(monthInfo.days)
	// 	console.log(monthInfo.days[4])
	// 	console.log(monthInfo.days[4].mergedRanges)
	// 	console.log(monthInfo.days[4].duration.toFormat("hh:mm"))
	// 	console.log(monthInfo.TotalWorkDuration.toFormat("hh:mm"))
	// }catch(e){console.error(e)}

	var workDaysTracker = await waitForElm("#MainDiv > .crm-tooltip");
	// var totalWorkDayToolTip = (await waitForElm(
	// 	"#MainDiv > .crm-tooltip > div",
	// )) as HTMLDivElement;

	var worksDay = monthInfo.DaysWorked.length
	
	var totalDelta = monthInfo.TotalWorkDuration.minus(Duration.fromMillis(worksDay * 8 * 3600000))

	var totalDeltaTimePrefix = totalDelta.toMillis() < 0 ? "Недоработка" : "Переработка";

	console.log(totalDeltaTimePrefix, abs(totalDelta).toFormat("hh:mm"));

	var totalDeltaElement = document.createElement("span");
	totalDeltaElement.textContent = `(${totalDeltaTimePrefix}: ${abs(totalDelta).toFormat("hh:mm")})`;
	totalDeltaElement.setAttribute("style", "color: #aaa; font-size: 0.8em;");

	workDaysTracker.appendChild(totalDeltaElement);
	//SetTimeInTotalToolTip(totalWorkDayToolTip, offline, online);
}

init();
