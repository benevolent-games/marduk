
import {sub, Sub, Trash} from "@e280/stz"
import {Comrade, Thread} from "@e280/comrade"
import {requestAnimationFrameLoop} from "@benev/slate"

import {theaterElement} from "./theater/element.js"
import {FigmentSpec, FigmentSync} from "../pure/types.js"
import {Frame, TheaterSchematic} from "../browser/types.js"
import {CanvasRezzer} from "../../../wip/babylon/iron/canvas-rezzer.js"

export type MakeFrontstageOptions = {
	workerUrl: URL | string
}

type Machina<Fs extends FigmentSpec> = {
	onFrame: Sub<[frame: Frame]>
	thread: Thread<TheaterSchematic<Fs>>
}

export class Frontstage<Fs extends FigmentSpec> {
	#trash = new Trash()
	canvas = document.createElement("canvas")
	rezzer = new CanvasRezzer(this.canvas, () => 1)

	ctx: CanvasRenderingContext2D

	frame: undefined | Frame
	previousFrame: undefined | Frame

	constructor(private machina: Machina<Fs>) {
		this.ctx = this.canvas.getContext("2d")!
		this.#trash.add(
			this.rezzer.on(this.#updateCanvas),
			machina.onFrame(this.#storeFrame),
			requestAnimationFrameLoop(this.#displayNewFrame),
		)
	}

	static async make<Fs extends FigmentSpec>(options: MakeFrontstageOptions) {
		const onFrame = sub<[frame: Frame]>()
		const thread = await Comrade.thread<TheaterSchematic<Fs>>({
			label: "theater",
			workerUrl: options.workerUrl,
			timeout: 1_000,
			setupHost: () => ({
				deliverFrame: async frame => {
					onFrame.pub(frame)
				},
			}),
		})
		return new this<Fs>({onFrame, thread})
	}

	getElements() {
		const MardukTheater = theaterElement(this)
		return {MardukTheater}
	}

	async syncFigments(figments: FigmentSync<Fs>) {
		return this.machina.thread.work.syncFigments(figments)
	}

	#updateCanvas = async() => {
		const {width, height} = this.canvas
		await this.machina.thread.work.setCanvasDetails({
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

