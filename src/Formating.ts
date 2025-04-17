export function FormatTime (time: number) {
	var dH = Math.floor(Math.abs(time))
	var dM = Math.round(Math.abs(time%1*60))
	return dH + ":" + (dM < 10 ? '0' + dM : dM)
}