
import {Trash} from "@e280/stz"
import {requestAnimationFrameLoop} from "@benev/slate"

import {Frame} from "./types.js"
import {Thunder} from "../thunder.js"
import {CanvasRezzer} from "../../iron/parts/canvas-rezzer.js"

export class Visualizer {
	#trash = new Trash()
	canvas = document.createElement("canvas")
	rezzer = new CanvasRezzer(this.canvas, () => 1)
	ctx: CanvasRenderingContext2D

	frame: undefined | Frame
	previousFrame: undefined | Frame

	constructor(public thunder: Thunder) {
		this.ctx = this.canvas.getContext("2d")!
		this.#trash.add(
			this.rezzer.onChange(this.#updateCanvas),
			thunder.onFrame(this.#storeFrame),
			requestAnimationFrameLoop(this.#displayNewFrame),
		)
	}

	#updateCanvas = async() => {
		const {width, height} = this.canvas
		await this.thunder.thread.work.setCanvasDetails({
			dimensions: [width, height],
		})
	}

	#storeFrame = (frame: Frame) => {
		this.frame = frame
	}

	#displayNewFrame = () => {
		const frame = (this.frame && this.frame !== this.previousFrame)
			? this.frame
			: undefined

		this.previousFrame = frame

		if (frame && this.canvas.isConnected && !isBitmapClosed(frame.bitmap)) {
			this.ctx.drawImage(frame.bitmap, 0, 0)
			frame.bitmap.close()
			this.ctx.fillStyle = "#fff8"
			this.ctx.font = "12px sans-serif"
			this.ctx.fillText(frame.count.toString(), 4, 16)
		}
	}

	dispose = () => {
		return this.#trash.dispose()
	}
}

function isBitmapClosed(bitmap: ImageBitmap) {
	return (bitmap.width === 0 || bitmap.height === 0)
}

