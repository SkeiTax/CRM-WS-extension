import { waitForElm } from "./DOMUtils"
import { FormatTime } from "./Formating"

console.log("Hello user!")

function showConsoleTime (prefix: string, time: number) {
	var char = Math.sign(time) < 0 ? "-" : ""
	console.log( prefix + ': ' + char + FormatTime(time) )
}

function SetTimeInTotalToolTip(tooltip: HTMLDivElement, offline: number, online: number) {
	var offlineSpan = document.createElement('span')
	offlineSpan.setAttribute('style', 'color: #aaa; font-size: 0.8em;')
	offlineSpan.textContent = ` (${FormatTime(Math.abs(offline))})`
	tooltip.children[0].appendChild(offlineSpan)

	var onlineSpan = document.createElement('span')
	onlineSpan.setAttribute('style', 'color: #aaa; font-size: 0.8em;')
	onlineSpan.textContent = ` (${FormatTime(Math.abs(online))})`
	tooltip.children[1].appendChild(onlineSpan)
}

async function init() {
	
	
	var element = await waitForElm('#MainDiv > table') as HTMLTableElement
	var workDaysTracker = await waitForElm('#MainDiv > .crm-tooltip')
	var totalWorkDayToolTip = await waitForElm('#MainDiv > .crm-tooltip > div') as HTMLDivElement
	
	var offline = 0
	var online = 0
	var matches = (document.querySelector('#MainDiv') as HTMLDivElement).textContent?.match(/(?<=из )\d+(?<!\))/)
	var worksDay = Number(matches?.[0])
	var days = document.querySelectorAll('td[name="day"] .crm-flex-container .crm-flex-child-middle:first-child')

	days.forEach((element) => {
		

		if (element.children[2].children.length>0 && (element.children[2].children[0] as HTMLDivElement).innerText === 'X') 
		{
			worksDay--
			return
		}
		
		offline += Number((element.children[0] as HTMLDivElement).innerText.replace(',','.'))
		online += Number((element.children[1] as HTMLDivElement).innerText.replace(',','.'))
	})
	
	var totalWorkTime = offline+online
	var totalDelta = (totalWorkTime-worksDay*8)
	var totalDeltaTimePrefix = totalDelta < 0 ? 'Недоработка' : 'Переработка'
	var avrOffline = offline/worksDay
	var avrOnline = online/worksDay


	showConsoleTime("Наработка общая", totalDelta)
	showConsoleTime("Наработка офлайн", offline)
	showConsoleTime("Наработка онлайн", online)
	showConsoleTime("Среднее на работе", avrOffline)
	showConsoleTime("Среднее удаленно", avrOnline)

	
	var totalDeltaElement = document.createElement('span')
	totalDeltaElement.textContent = `(${totalDeltaTimePrefix}: ${FormatTime(Math.abs(totalDelta))})`
	totalDeltaElement.setAttribute('style', 'color: #aaa; font-size: 0.8em;')


	workDaysTracker.appendChild(totalDeltaElement)
	SetTimeInTotalToolTip(totalWorkDayToolTip, offline, online)

}

init()
