import { DateTime } from "luxon";
import { waitForElm, createElement } from "./Utils/DOMUtils";
import { MonthInfo as MonthInfo } from "./Model/MonthInfo";
import { createApp } from "vue";
import "../resources/style.css";
import Root from "./Layouts/Root.vue";
import { WorkTimeVM } from "./Model/WorkTimeVM";

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

    var mainDiv = await waitForElm("#MainDiv");

    const userSNP = (mainDiv.children[0] as HTMLSpanElement).innerText;
    const matchs = (
      mainDiv.children[mainDiv.children.length - 2] as HTMLDivElement
    ).innerHTML.match(/\((.*)\)([\W\w]*)/)
    const shortWorkInfoHTML = `${matchs?.[1]}${matchs?.[2]}`;

    var workInfo = createElement("div", { id: "work-info" });
    Array.from(mainDiv.children).forEach((child) => {
      workInfo.appendChild(child);
    });

    const wokrTimeVM = new WorkTimeVM(
      this.monthInfo,
      userSNP,
      shortWorkInfoHTML
    );

    const el = createElement("div", {}, { width: "100%" });
    mainDiv.appendChild(el);

    createApp(Root, {
      workTimeVM: wokrTimeVM,
      mainTable: table,
    }).mount(el);
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
    if (target && target.tagName === "SELECT" && 
      document.querySelector('#MainDiv')?.innerHTML !== 'Загруска...') {
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
