
import {Engine} from "@babylonjs/core/Engines/engine.js"
import {EngineOptions} from "@babylonjs/core/Engines/thinEngine.js"
import {WebGPUEngine, WebGPUEngineOptions} from "@babylonjs/core/Engines/webgpuEngine.js"
import {AnyCanvas} from "../types.js"

export async function makeEngine(options: {
		canvas: AnyCanvas
		webgl: EngineOptions
		webgpu?: WebGPUEngineOptions
	}) {

	const {canvas, webgl, webgpu} = options

	if (webgpu) {
		const engine = await makeEngineWebgpu(canvas, webgpu)
		if (engine) return engine
	}

	return makeEngineWebgl(canvas, webgl)
}

export function makeEngineWebgl(canvas: AnyCanvas, options: EngineOptions) {
	return new Engine(canvas, undefined, options)
}

export async function makeEngineWebgpu(canvas: AnyCanvas, options: WebGPUEngineOptions) {
	const supported = await WebGPUEngine.IsSupportedAsync
	if (!supported) return undefined
	const engine = new WebGPUEngine(canvas, options)
	await engine.initAsync()
	return engine
}

