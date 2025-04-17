"use strict";
// import 'core-js/es/promise';        // полифилл для Promise
// import 'core-js/es/math/sign';      // полифилл для Math.sign, если нужен
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
console.log("Hello user!");
// crm-tooltip
function FormatTime(time) {
    var dH = Math.floor(Math.abs(time));
    var dM = Math.round(Math.abs(time % 1 * 60));
    return dH + ":" + (dM < 10 ? '0' + dM : dM);
}
function showConsoleTime(prefix, time) {
    var char = Math.sign(time) < 0 ? "-" : "";
    console.log(prefix + ': ' + char + FormatTime(time));
}
function waitForElm(selector) {
    return new Promise(function (resolve) {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }
        var observer = new MutationObserver(function (mutations) {
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
function SetTimeInTotalToolTip(tooltip, offline, online) {
    var offlineSpan = document.createElement('span');
    offlineSpan.setAttribute('style', 'color: #aaa; font-size: 0.8em;');
    offlineSpan.textContent = " (".concat(FormatTime(Math.abs(offline)), ")");
    tooltip.children[0].appendChild(offlineSpan);
    var onlineSpan = document.createElement('span');
    onlineSpan.setAttribute('style', 'color: #aaa; font-size: 0.8em;');
    onlineSpan.textContent = " (".concat(FormatTime(Math.abs(online)), ")");
    tooltip.children[1].appendChild(onlineSpan);
}
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var element, workDaysTracker, totalWorkDayToolTip, offline, online, matches, worksDay, days, totalWorkTime, totalDelta, totalDeltaTimePrefix, avrOffline, avrOnline, totalDeltaElement;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, waitForElm('#MainDiv > table')];
                case 1:
                    element = _b.sent();
                    return [4 /*yield*/, waitForElm('#MainDiv > .crm-tooltip')];
                case 2:
                    workDaysTracker = _b.sent();
                    return [4 /*yield*/, waitForElm('#MainDiv > .crm-tooltip > div')];
                case 3:
                    totalWorkDayToolTip = _b.sent();
                    console.log(element);
                    offline = 0;
                    online = 0;
                    matches = (_a = document.querySelector('#MainDiv').textContent) === null || _a === void 0 ? void 0 : _a.match(/(?<=из )\d+(?<!\))/);
                    worksDay = Number(matches === null || matches === void 0 ? void 0 : matches[0]);
                    days = document.querySelectorAll('td[name="day"] .crm-flex-container .crm-flex-child-middle:first-child');
                    days.forEach(function (element) {
                        if (element.children[2].children.length > 0 && element.children[2].children[0].innerText === 'X') {
                            worksDay--;
                            return;
                        }
                        offline += Number(element.children[0].innerText.replace(',', '.'));
                        online += Number(element.children[1].innerText.replace(',', '.'));
                    });
                    totalWorkTime = offline + online;
                    totalDelta = (totalWorkTime - worksDay * 8);
                    totalDeltaTimePrefix = totalDelta < 0 ? 'Недоработка' : 'Переработка';
                    avrOffline = offline / worksDay;
                    avrOnline = online / worksDay;
                    console.log(totalDelta);
                    showConsoleTime("Наработка общая", totalDelta);
                    showConsoleTime("Наработка офлайн", offline);
                    showConsoleTime("Наработка онлайн", online);
                    showConsoleTime("Среднее на работе", avrOffline);
                    showConsoleTime("Среднее удаленно", avrOnline);
                    totalDeltaElement = document.createElement('span');
                    totalDeltaElement.textContent = "(".concat(totalDeltaTimePrefix, ": ").concat(FormatTime(Math.abs(totalDelta)), ")");
                    totalDeltaElement.setAttribute('style', 'color: #aaa; font-size: 0.8em;');
                    workDaysTracker.appendChild(totalDeltaElement);
                    SetTimeInTotalToolTip(totalWorkDayToolTip, offline, online);
                    return [2 /*return*/];
            }
        });
    });
}
init();
