
import {Trash} from "@e280/stz"
import {requestAnimationFrameLoop} from "@benev/slate"

import {Thunder} from "../thunder.js"
import {CanvasRezzer} from "../../iron/parts/canvas-rezzer.js"

export class Visualizer {
	#trash = new Trash()
	canvas = document.createElement("canvas")
	rezzer = new CanvasRezzer(this.canvas, () => 1)
	ctx: CanvasRenderingContext2D

	frameNext: undefined | {frame: number, bitmap: ImageBitmap}
	frameDone: undefined | {frame: number, bitmap: ImageBitmap}

	constructor(public thunder: Thunder) {
		this.ctx = this.canvas.getContext("2d")!
		this.#updateCanvas()
		this.#trash.add(
			this.rezzer.onChange(this.#updateCanvas),
			thunder.onFrame(this.#storeNextFrame),
			requestAnimationFrameLoop(this.#displayNewFrames),
		)
	}

	#updateCanvas = async() => {
		await this.thunder.thread.work.setCanvasDetails({
			dimensions: [this.canvas.width, this.canvas.height],
		})
	}

	#storeNextFrame = (frame: number, bitmap: ImageBitmap) => {
		this.frameNext = {frame, bitmap}
	}

	#displayNewFrames = () => {
		const newFrame = this.frameNext !== this.frameDone
		if (newFrame && this.frameNext) {
			this.frameDone = this.frameNext
			this.ctx.drawImage(this.frameNext.bitmap, 0, 0)
		}
	}

	dispose = () => {
		return this.#trash.dispose()
	}
}

