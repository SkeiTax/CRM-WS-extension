(function () {
    'use strict';

    Object.defineProperty(exports, "__esModule", { value: true });
    const luxon_1 = require("luxon");
    const DOMUtils_1 = require("./DOMUtils");
    const Formating_1 = require("./Formating");
    const MonthInfo_1 = require("./Model/MonthInfo");
    const auto_1 = require("chart.js/auto");
    console.log("Hello user!");
    function GetFilterDate() {
        return luxon_1.DateTime.fromObject({
            year: Number(document.querySelector('#Year').value),
            month: Number(document.querySelector('#Month').value)
        });
    }
    async function init() {
        var table = (await (0, DOMUtils_1.waitForElm)("#MainDiv > table"));
        var filterDate = GetFilterDate();
        var monthInfo = new MonthInfo_1.MonthInfo(table, filterDate);
        // try {
        // 	console.log(monthInfo.days)
        // 	console.log(monthInfo.days[4])
        // 	console.log(monthInfo.days[4].mergedRanges)
        // 	console.log(monthInfo.days[4].duration.toFormat("hh:mm"))
        // 	console.log(monthInfo.TotalWorkDuration.toFormat("hh:mm"))
        // }catch(e){console.error(e)}
        var workDaysTracker = await (0, DOMUtils_1.waitForElm)("#MainDiv > .crm-tooltip");
        // var totalWorkDayToolTip = (await waitForElm(
        // 	"#MainDiv > .crm-tooltip > div",
        // )) as HTMLDivElement;
        var worksDay = monthInfo.DaysWorked.length;
        var totalDelta = monthInfo.TotalWorkDuration.minus(luxon_1.Duration.fromMillis(worksDay * 8 * 3600000));
        var totalDeltaTimePrefix = totalDelta.toMillis() < 0 ? "Недоработка" : "Переработка";
        console.log(totalDeltaTimePrefix, (0, Formating_1.abs)(totalDelta).toFormat("hh:mm"));
        var totalDeltaElement = document.createElement("span");
        totalDeltaElement.textContent = `(${totalDeltaTimePrefix}: ${(0, Formating_1.abs)(totalDelta).toFormat("hh:mm")})`;
        totalDeltaElement.setAttribute("style", "color: #aaa; font-size: 0.8em;");
        workDaysTracker.appendChild(totalDeltaElement);
        //SetTimeInTotalToolTip(totalWorkDayToolTip, offline, online);
        var canvas = document.createElement("canvas");
        (await (0, DOMUtils_1.waitForElm)("#MainDiv")).append(canvas);
        new auto_1.Chart(canvas, {
            type: 'line',
            data: {
                labels: monthInfo.days.map(day => `${day.number}.${filterDate.month}`) /* даты */,
                datasets: [{
                        label: 'Начало рабочего дня',
                        data: monthInfo.days.map(day => day.mergedRanges.filter(range => range.begin != undefined)[0]),
                        fill: true,
                        borderColor: 'rgb(116, 158, 98)',
                        tension: 0.1
                    },
                    {
                        label: 'Конец рабочего дня',
                        data: monthInfo.days.map(day => {
                            var ranges = day.mergedRanges.filter(range => range.end != undefined);
                            return ranges[ranges.length - 1];
                        }),
                        fill: true,
                        borderColor: 'rgb(197, 181, 93)',
                        tension: 0.1
                    }]
            }
        });
    }
    init();

})();
