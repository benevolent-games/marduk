
import {lightComponent} from "@benev/slate"
import {TheaterView} from "./view.js"
import {Frontstage} from "../frontstage.js"

export const theaterElement = (frontstage: Frontstage<any>) => lightComponent(_use => {
	return TheaterView([frontstage])
})

