
import {Mk} from "../../../mk/mk.js"
import {Demo} from "../../harness/view.js"
import {makeLilCanvasView} from "../../harness/lil-canvas-view.js"

import {Color3} from "@babylonjs/core/Maths/math.color.js"
import {Vector3} from "@babylonjs/core/Maths/math.vector.js"
import {MeshBuilder} from "@babylonjs/core/Meshes/meshBuilder.js"
import {ArcRotateCamera} from "@babylonjs/core/Cameras/arcRotateCamera.js"
import {HemisphericLight} from "@babylonjs/core/Lights/hemisphericLight.js"
import {StandardMaterial} from "@babylonjs/core/Materials/standardMaterial.js"

export const cubeDemo: Demo = ["cube", async() => {
	const mk = new Mk()
	const canvas = mk.canvas()
	const autoscaler = mk.autoscaler(canvas)
	const afterFirstRender = () => autoscaler.rescale()
	mk.pointerlocker(canvas, {unadjustedMovement: true})
	const engine = await mk.engine({canvas, webgl: {}})
	const scene = mk.scene({engine})

	const camera = new ArcRotateCamera("cam", -Math.PI / 2, Math.PI / 2.5, 4, Vector3.Zero(), scene)
	camera.attachControl(canvas, true)
	new HemisphericLight("light", new Vector3(0.123, 1, 0), scene)

	const box = MeshBuilder.CreateBox("box", {size: 1}, scene)
	const mat = new StandardMaterial("boxMat", scene)
	mat.diffuseColor = new Color3(0, 1, 1)
	box.material = mat

	engine.runRenderLoop(() => {
		box.rotation.y += engine.getDeltaTime() * 0.0015
		scene.render()
	})

	return {
		demoView: makeLilCanvasView(canvas, afterFirstRender),
		dispose: () => engine.stopRenderLoop(),
	}
}]

