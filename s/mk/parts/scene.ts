
import {Vec4} from "@benev/math"
import {Scene} from "@babylonjs/core/scene.js"
import {Color4} from "@babylonjs/core/Maths/math.color.js"
import {setOpenGLOrientationForUV} from "@babylonjs/core/Compat/compatibilityOptions.js"
import {AnyEngine} from "../types.js"

export type SimpleSceneOptions = {
	engine: AnyEngine
	virtual?: boolean
	background?: Vec4
}

export function makeScene(options: SimpleSceneOptions) {
	const {
		engine,
		virtual = false,
		background = Vec4.new(.1, .1, .1, 1),
	} = options

	const scene = new Scene(engine, {
		virtual,
		useClonedMeshMap: true,
		useMaterialMeshMap: true,
		useGeometryUniqueIdsMap: true,
	})

	setOpenGLOrientationForUV(true)
	scene.clearColor = new Color4(...background.array())
	scene.detachControl()
	scene.useRightHandedSystem = true

	return scene
}

