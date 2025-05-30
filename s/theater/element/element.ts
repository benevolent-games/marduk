
import {lightComponent} from "@benev/slate"
import {TheaterView} from "./view.js"
import {Frontstage} from "../parts/frontstage.js"

export const theaterElement = (frontstage: Frontstage) => lightComponent(_use => {
	return TheaterView([frontstage])
})

