
import {shadowView} from "@benev/slate"
import styleCss from "./style.css.js"
import {Frontstage} from "../parts/frontstage.js"

export const TheaterView = shadowView(use => (frontstage: Frontstage) => {
	use.styles(styleCss)
	use.deferOnce(() => frontstage.rezzer.recalibrate())
	return frontstage.canvas
})

