
import {Vec2Array} from "@benev/math"
import {AsFigs, FigSyncs} from "../layers/fig.js"

export type DemoFigs = AsFigs<{
	canvas: {
		play: boolean
		dimensions: Vec2Array
	}
	timestamp: number
}>

export type DemoPayload = FigSyncs<DemoFigs>
export type DemoResult = {bitmap: ImageBitmap}

