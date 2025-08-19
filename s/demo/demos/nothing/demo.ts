
import {css, html} from "lit"
import {cssReset, view} from "@e280/sly"
import {DemoFn} from "../../harness/view.js"

export default <DemoFn>(async() => {
	const demoView = view(use => () => {
		use.styles(cssReset, stylesCss)
		return html`
			<img src="/assets/b.svg" alt=""/>
			<h2>marduk demos</h2>
			<p>click a button below to load a demo</p>
		`
	})

	return {demoView, dispose: () => {}}
})

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

img {
	width: 8em;
	margin-bottom: 2em;
}

h2 {
	font-size: 2em;
}
`

