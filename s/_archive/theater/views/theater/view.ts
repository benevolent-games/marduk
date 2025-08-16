
import {view} from "@e280/sly"
import styleCss from "./style.css.js"
import {Frontstage} from "../frontstage.js"

export const TheaterView = view(use => (frontstage: Frontstage<any>) => {
	use.name("theater")
	use.styles(styleCss)
	use.rendered.then(() => frontstage.rezzer.recalibrate())
	return frontstage.canvas
})

