import { DateTime, Duration } from "luxon";
import { StoredProperty } from "./StoredProperty";

export class IsDayOffCollection
{
    private static cache = new StoredProperty("working-сalendar", [] as WorkDayInfo[]);

    private static get Cache() {
        return this.cache.value.map((e)=> new WorkDayInfo().clon(e))
    }
    private static set Cache(value) {
        this.cache.value = value.sort((a,b)=>b.Date.diff(a.Date).toMillis());
    }

    private async getdata(year: number, month: number)
    {
        const data = await IsDayOffApi.getdata({year: year, month: month, pre: true});
        return data.map((e,i) => new WorkDayInfo(DateTime.now(), DateTime.fromObject({year, month, day: i+1}), e as WorkDayType))
    }

    public async WorkDayType(date: DateTime)
    {
        const onlyDate = DateTime.fromObject({year: date.year, month: date.month, day: date.day})
        const _cache = IsDayOffCollection.Cache;
        const findedInfo = _cache.find((workDayInfo) => workDayInfo.Date.diff(onlyDate).toMillis() == 0);
        if (findedInfo !== undefined) 
            return findedInfo.Type;

        const data = await this.getdata(onlyDate.year, onlyDate.month);
        data.forEach(e => {
            const findedInfo = _cache.find((workDayInfo) => workDayInfo.Date.diff(e.Date).toMillis() == 0);
            if (findedInfo === undefined) 
                _cache.push(e);
        })
        IsDayOffCollection.Cache = _cache;
        return _cache.find((workDayInfo) => workDayInfo.Date.diff(onlyDate).toMillis() == 0);
    }
}

class IsDayOffApi
{
    // URL example: https://isdayoff.ru/api/getdata?year=2025&delimeter=%0A&pre=1
    private static HOST = "isdayoff.ru";
    private static PATH = "api/getdata";
    public static BASE_URL = `https://${this.HOST}/`;
    
    public static async getdata(params: GetDataParams)
    {
        const url = this.BuildURL(this.BASE_URL, this.PATH, params);

        const response = await fetch(url);
        const text = await this.ResponseValidate(response);
        return Array.from(text)
                    .map(e => Number(e) as WorkDayType);
    }

    private static BuildURL(base: string, path: string, params: object){
        const url = new URL(path, base);
        const paramsKeys = Object.keys(params);
        const keyValues = paramsKeys.map((key) => {
            return {
                key: key, 
                value: {... params}[key] as any,
            }
        });
        keyValues.forEach((pair) => url.searchParams.append(pair.key, pair.value?.toString()??""));
        return url;
    }

    private static async ResponseValidate(response: Response)
    {
        if (!response.ok)
            throw `Запрос выполнился со статусом: ${response.statusText}`;
        const text = await response.text();
        switch(Number(text) as IsDayOffResponceError)
        {
            case IsDayOffResponceError.DateError:       throw "Некорректная дата";
            case IsDayOffResponceError.DataNotFound:    throw "Данные не найдены";
            case IsDayOffResponceError.ServiceError:    throw "Ошибка сервиса";
            default:
        }
        return text;
    }
}

/**
 * @param year - год
 * @param month - месяц
 * @param day - день
 * @param cc - код страны (RU)
 * @param pre - помечать сокращенные рабочие дни цифрой 2 (false)
 * @param covid - помечать рабочие дни цифрой 4 (в связи с пандемией COVID-19) (false)
 * @param sd - считать, что неделя шестидневная (false)
 */
type GetDataParams = 
{
    year: number, 
    month?: number, 
    day?: number, 
    cc?: number, 
    pre?: boolean, 
    covid?: boolean, 
    sd?: boolean
}

export class WorkDayInfo
{
    private addedDate!: string;
    private date!: string;
    private type!: string;
    
    get AddedDate(){ return DateTime.fromISO(this.addedDate)};
    set AddedDate(value){ this.addedDate = value.toISO() as string};
    
    get Date(){ return DateTime.fromISO(this.date)};
    set Date(value){ this.date = value.toISO() as string};

    get Type(){ return Number(this.type) as WorkDayType; };
    set Type(value){ this.type = value.toString()};

    constructor(addedDate?: DateTime, date?: DateTime, type?: WorkDayType)
    {
        if (addedDate !== undefined) {
            this.AddedDate = addedDate;
        }
        if (date !== undefined) {
            this.Date = date;
        }
        if (type !== undefined) {
            this.Type = type;
        }
    }

    public clon(object: any)
    {
        this.addedDate = object.addedDate;
        this.date = object.date;
        this.type = object.type;
        return this;
    }
}

export enum WorkDayType
{
    working  = 0, // рабочий день
    Weekend = 1, // выходной или не рабочий день
    shortened = 2, // сокращенный день
    workingOnCovid = 4, // рабочий день в ковидное время
}

export enum IsDayOffResponceError
{
    /**
     * Некорректная дата
     */
    DateError = 100,

    /**
     * Данные не найдены
     */
    DataNotFound = 101,

    /**
     * Ошибка сервиса
     */
    ServiceError = 199,
}