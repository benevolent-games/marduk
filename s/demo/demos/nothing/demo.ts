
import {css, html} from "lit"
import {cssReset, view} from "@e280/sly"
import {Demo} from "../../harness/view.js"

export const nothingDemo: Demo = ["nothing", async() => {
	const demoView = view(use => () => {
		use.styles(cssReset, stylesCss)

		return html`
			<h2>marduk demos</h2>
			<p>click a button below to load a demo</p>
		`
	})

	return {demoView, dispose: () => {}}
}]

const stylesCss = css`
:host {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

:host > * {
	color: color-mix(in lch, transparent, var(--prime) 40%);
}

h2 {
	font-size: 2em;
}
`

