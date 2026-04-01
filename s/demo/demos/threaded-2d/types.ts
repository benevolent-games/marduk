
import {XyArray} from "@benev/math"
import {AsFigs, FigSyncs} from "../../../theater2/layers/fig.js"

export type DemoFigs = AsFigs<{
	canvas: {
		play: boolean
		dimensions: XyArray
	}
	timestamp: number
}>

export type DemoPayload = FigSyncs<DemoFigs>
export type DemoResult = {bitmap: ImageBitmap}
