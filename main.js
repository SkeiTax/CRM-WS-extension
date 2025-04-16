console.log("Hello user!")
// crm-tooltip


function waitForElm(selector) {
	return new Promise(resolve => {
		if (document.querySelector(selector)) {
			return resolve(document.querySelector(selector));
		}
		const observer = new MutationObserver(mutations => {
			if (document.querySelector(selector)) {
				resolve(document.querySelector(selector));
				observer.disconnect();
			}
		});
		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
	});
}

async function init (){
	var element = await waitForElm('#MainDiv table')
	console.log(element)
	
	var offline = 0
	var online = 0
	var worksDay = Number(document.querySelector('#MainDiv').textContent.match(/(?<=из )\d+(?<!\))/)[0])
	var days = document.querySelectorAll('td[name="day"] .crm-flex-container .crm-flex-child-middle:first-child')

	days.forEach((element) => {
		if (element.children[2].children.length>0 && element.children[2].children[0].innerText === 'X') 
		{
			worksDay--
			return
		}
		
		offline += Number(element.children[0].innerText.replace(',','.'))
		online += Number(element.children[1].innerText.replace(',','.'))
	})
	function showTime (prefix, time){
		var char = Math.sign(time) < 0 ? "-" : ""
		var dH = Math.floor(Math.abs(time))
		var dM = Math.round(Math.abs(time%1*60))
		console.log( prefix + ': ' + char + dH + ":" + (dM < 10 ? '0' + dM : dM) )
	}
	var totalWorkTime = offline+online
	var totalDelta = (totalWorkTime-worksDay*8)
	var avrOffline = offline/worksDay
	var avrOnline = online/worksDay


	console.log(totalDelta)
	showTime("Наработка общая", totalDelta)
	showTime("Наработка офлайн", offline)
	showTime("Наработка онлайн", online)
	showTime("Среднее на работе", avrOffline)
	showTime("Среднее удаленно", avrOnline)
}

init()