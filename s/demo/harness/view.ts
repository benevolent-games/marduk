
import {css, html} from "lit"
import {cssReset, View, view} from "@e280/sly"

export type Demo = [name: string, view: View<[]>]

export const DemoHarness = view(use => (...demos: Demo[]) => {
	use.styles(cssReset, stylesCss)

	const index = use.signal(0)
	const click = (newIndex: number) => () => index(newIndex)

	const [,DemoView] = demos.at(index())!

	return html`
		${DemoView()}

		<nav>
			${demos.map(([name], i) => html`
				<button @click="${click(i)}" ?disabled="${index() === i}">
					${name}
				</button>
			`)}
		</nav>
	`
})

const stylesCss = css`
:host {
	display: flex;
	flex-direction: column;
	gap: 0.5em;
}

nav, sly-view {
	background: var(--bg2);
	border: solid 1px #fff1;
	border-top: solid 1px #fff0;
	border-bottom: solid 1px #fff4;
	box-shadow:
		inset 0.2em 0.3em 1em #0008,
		inset 0.2em 0.3em 5em #0004;
	border-radius: 1em;
	overflow: hidden;
}

sly-view {
	flex: 1 1 auto;
}

nav {
	flex: 0 0 auto;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	padding: 0.5em;
	> button {
		padding: 0.5em;
	}
}
`

