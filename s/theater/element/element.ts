
import {html, shadowComponent} from "@benev/slate"
import styleCss from "./style.css.js"
import {Theater} from "../theater.js"
import {Frontstage} from "../parts/frontstage.js"

export const theaterElement = (theater: Theater) => shadowComponent(use => {
	use.styles(styleCss)

	const frontstage = use.init(() => {
		const frontstage = new Frontstage(theater)
		return [frontstage, frontstage.dispose]
	})

	use.deferOnce(() => {
		frontstage.rezzer.recalibrate()
	})

	return html`
		${frontstage.canvas}
	`
})

