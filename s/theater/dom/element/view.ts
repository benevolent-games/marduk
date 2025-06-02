
import {shadowView} from "@benev/slate"
import styleCss from "./style.css.js"
import {Frontstage} from "../frontstage.js"

export const TheaterView = shadowView(use => (frontstage: Frontstage<any>) => {
	use.styles(styleCss)
	use.deferOnce(() => frontstage.rezzer.recalibrate())
	return frontstage.canvas
})

