import { DateTime, Duration } from "luxon";
import { waitForElm } from "./DOMUtils";
import { abs} from "./Formating";
import { MonthInfo as MonthInfo } from "./Model/MonthInfo";
import { Chart } from "chart.js/auto";
import 'chartjs-adapter-luxon';
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
	console.log(DateTime.now().zone)

	var totalDeltaElement = document.createElement("span");
	totalDeltaElement.textContent = `(${totalDeltaTimePrefix}: ${abs(totalDelta).toFormat("hh:mm")})`;
	totalDeltaElement.setAttribute("style", "color: #aaa; font-size: 0.8em;");

	workDaysTracker.appendChild(totalDeltaElement);
	//SetTimeInTotalToolTip(totalWorkDayToolTip, offline, online);

	var chartDiv = document.createElement("div") as HTMLDivElement;
	chartDiv.setAttribute("style", "width: 800px; height: 400px;");
	var canvas = document.createElement("canvas") as HTMLCanvasElement;
	chartDiv.appendChild(canvas);

	(await waitForElm("#MainDiv")).append(chartDiv)

	function chartLabels(){
		var data = monthInfo.days.map(day => `${day.number}.${filterDate.month}`) 
		return data
	}

	function daysStartWork(){
		var data = monthInfo.days.map(day=>{
			var ranges = day.mergedRanges.filter(range=>range.begin != undefined)
			return {
				y: ranges.length == 0 
					? undefined
					: ranges[0].begin?.minus(day.date.toMillis()),
				x: day.date?.toISO()
			}
		})
		return data
	}

	function daysEndWork(){
		var data = monthInfo.days.map(day=>{
			var ranges = day.mergedRanges.filter(range=>range.end != undefined)
			return {
				y: ranges.length == 0 
					? undefined
					: ranges[ranges.length-1].end?.minus(day.date.toMillis()),
				x: day.date?.toISO()
			}
		})
		return data
	}

	var ctx = canvas.getContext('2d')!

	const gradient = ctx.createLinearGradient(0, 0, 0, 400);  // вертикальный градиент
	gradient.addColorStop(0, 'rgba(210, 180, 140, 0.75)');      // сверху — полупрозрачный зеленый
	gradient.addColorStop(1, 'rgba(116, 158, 98, 0)');        // снизу — прозрачный

	new Chart(canvas, {
		type: 'line',
		data:{
			datasets: [{
				label: 'Начало рабочего дня',
				data: daysStartWork(),
				fill: "+1",
				backgroundColor: gradient,
				borderColor: 'rgb(116, 158, 98)',
				tension: 0.2
			},
			{
				label: 'Конец рабочего дня',
				data: daysEndWork(),
				fill: false,
				borderColor: 'rgb(210, 180, 140)',
				tension: 0.2
			}]
		},
		options:{
			scales: {
				x: {
					adapters: {
						date: {
							zone: "UTC",
							setZone: true
						},
					},
					type: 'time',
					time: {
						unit: 'day',
						displayFormats: {
							day: 'dd.MM'
						},
					},
					title: {
						display: true,
						text: 'Дата'
					}
				},
				y: {
					adapters: {
						date: {
							zone: "UTC",
							setZone: true
						},
					},
					type: 'time',
					time: {
						unit: 'hour',
						displayFormats: {
							hour: 'HH:mm'
						},
						tooltipFormat: 'HH:mm',
						// parser: function (value) {
						// 	if (value === 0) return 0
						// 	var time = value as DateTime
						// 	if (time === undefined) return 0
						// 	return time.toUTC().toMillis();
						// }
					},
					title: {
						display: true,
						text: 'Время'
					}
				}
			}
		}
	})
}

init();
