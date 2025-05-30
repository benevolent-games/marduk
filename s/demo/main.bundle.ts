
import {register} from "@benev/slate"
import {demoFrontstage} from "./theater/front.js"
import {theaterElement} from "../theater/element/element.js"

const frontstage = await demoFrontstage()
const MardukTheater = theaterElement(frontstage)
register({MardukTheater})
console.log("👁️")

