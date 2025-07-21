
//
// import {Rig} from "@e280/renraku"
// import {Vec2Array} from "@benev/math"
// import {HostShell, SetupHost, SetupWork} from "@e280/comrade"
//
// import {RenderingSchematic} from "./rendering.js"
// import {isBitmapClosed} from "../utils/is-bitmap-closed.js"
//
// export type StageState = {
// 	dimensions: Vec2Array
// }
//
// export type StageResult = {
// 	count: number
// 	bitmap: ImageBitmap
// }
//
// export type StageSchematic<Payload> = RenderingSchematic<StageState, Payload, StageResult>
//
// export class Frontstage<Payload> {
// 	count = -1
// 	canvas = document.createElement("canvas")
// 	ctx = this.canvas.getContext("2d")
//
// 	setupHost: SetupHost<StageSchematic<Payload>> = (_shell, _rig) => ({
// 		deliver: async({bitmap, count}) => {
// 			if (!this.ctx) return undefined
// 			const isNewFrame = count > this.count
// 			const isConnected = this.canvas.isConnected
// 			const isOpen = !isBitmapClosed(bitmap)
//
// 			if (isNewFrame && isConnected && isOpen) {
// 				this.ctx.drawImage(bitmap, 0, 0)
// 				bitmap.close()
// 				this.#drawCount(count)
// 			}
// 		},
// 	})
//
// 	#drawCount(count: number) {
// 		if (!this.ctx) return undefined
// 		this.ctx.fillStyle = "#fff8"
// 		this.ctx.font = "12px sans-serif"
// 		this.ctx.fillText(count.toString(), 4, 16)
// 	}
// }
//
// export type BackstageFn<Payload> = (
// 	(shell: HostShell<StageSchematic<Payload>>, rig: Rig) =>
// 		(payload: Payload) => Promise<void>
// )
//
// export class Backstage<Payload> {
// 	canvas = new OffscreenCanvas(0, 0)
// 	setupWork: SetupWork<StageSchematic<Payload>>
//
// 	constructor(fn: BackstageFn<Payload>) {
// 		this.setupWork = (shell, rig) => ({
// 			set: async({dimensions: [x, y]}) =>{
// 				this.canvas.width = x
// 				this.canvas.height = y
// 			},
// 			supply: fn(shell, rig),
// 		})
// 	}
// }
//
