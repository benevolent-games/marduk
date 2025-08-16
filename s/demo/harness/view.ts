
import {css, html} from "lit"
import {cssReset, loady, Op, View, view} from "@e280/sly"

export type Demo = [name: string, loadDemoView: () => Promise<View<[]>>]

export const DemoHarness = view(use => (...demos: Demo[]) => {
	use.styles(cssReset, stylesCss)
	const index = use.signal(0)

	const [,loadDemo] = demos.at(index())!
	const op = use.signal(Op.loading<View<[]>>())
	use.once(() => op().fn(loadDemo))

	const click = (newIndex: number) => async() => {
		index(newIndex)
		const [,loadDemo] = demos.at(newIndex)!
		op(Op.fn(loadDemo))
	}

	return html`
		${loady.dots(op(), DemoView => DemoView())}

		<nav>
			${demos.map(([name], i) => html`
				<button
					@click="${click(i)}"
					?disabled="${op().isLoading || index() === i}">
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
	gap: 0.5em;

	> button {
		padding: 0.5em;
	}
}
`

