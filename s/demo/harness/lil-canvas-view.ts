
import {css} from "lit"
import {cssReset, shadow, useCss, useMount, useRendered} from "@e280/sly"

export function makeLilCanvasView(canvas: HTMLCanvasElement, afterFirstRender = () => {}) {
	return shadow(() => {
		useCss(cssReset, stylesCss)
		const rendered = useRendered()
		useMount(() => {
			rendered.then(afterFirstRender)
			return () => {}
		})
		return canvas
	})
}

const stylesCss = css`
	:host {
		position: relative;
	}

	canvas {
		display: block;
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
`
