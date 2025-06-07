import { Duration } from "luxon"

export function showConsoleTime(prefix: string, time: number) {
	var char = Math.sign(time) < 0 ? "-" : "";
	console.log(prefix + ": " + char + FormatTime(time));
}

export function FormatTime (time: number) {
	var dH = Math.floor(Math.abs(time))
	var dM = Math.round(Math.abs(time%1*60))
	return dH + ":" + (dM < 10 ? '0' + dM : dM)
}


export function abs(duration: Duration){
	if (duration.toMillis() < 0)
		return Duration.fromMillis(-duration.toMillis())
	return duration
}