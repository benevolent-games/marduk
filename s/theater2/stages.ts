
import {Vec2Array} from "@benev/math"
import {HostShell, SetupHost, SetupWork} from "@e280/comrade"
import {RenderingSchematic} from "./rendering.js"
import {isBitmapClosed} from "./utils/is-bitmap-closed.js"
import { Rig } from "@e280/renraku"

export type StageState = {
	dimensions: Vec2Array
}

export type StageResult = {
	count: number
	bitmap: ImageBitmap
}

export type StageSchematic<Payload> = RenderingSchematic<StageState, Payload, StageResult>

export class Frontstage<Payload> {
	count = -1
	canvas = document.createElement("canvas")
	ctx = this.canvas.getContext("2d")

	host: SetupHost<StageSchematic<Payload>> = (_shell, _rig) => ({
		deliver: async({bitmap, count}) => {
			if (!this.ctx) return undefined
			const isNewFrame = count > this.count
			const isConnected = this.canvas.isConnected
			const isOpen = !isBitmapClosed(bitmap)

			if (isNewFrame && isConnected && isOpen) {
				this.ctx.drawImage(bitmap, 0, 0)
				bitmap.close()
				this.#drawCount(count)
			}
		},
	})

	#drawCount(count: number) {
		if (!this.ctx) return undefined
		this.ctx.fillStyle = "#fff8"
		this.ctx.font = "12px sans-serif"
		this.ctx.fillText(count.toString(), 4, 16)
	}
}

export type BackstageFn<Payload> = (canvas: OffscreenCanvas) => (shell: HostShell<StageSchematic<Payload>>, rig: Rig) => {
	supply: (payload: Payload) => Promise<void>
}

export function setupBackstage<Payload>(fn: BackstageFn<Payload>): SetupWork<StageSchematic<Payload>> {
	const canvas = new OffscreenCanvas(0, 0)
	const fn2 = fn(canvas)
	return (shell, rig) => ({
		async set({dimensions: [x, y]}) {
			canvas.width = x
			canvas.height = y
		},
		supply: fn2(shell, rig).supply,
	})
}

