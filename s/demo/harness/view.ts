
import {css, html} from "lit"
import {cssReset, View, view, makeLoader, anims} from "@e280/sly"

export type Demo = [name: string, loadDemoView: () => Promise<View<[]>>]

const loader = makeLoader(anims.earth)

export const DemoHarness = view(use => (...demos: Demo[]) => {
	use.name("harness")
	use.styles(cssReset, stylesCss)

	const index = use.signal(0)

	async function loadDemo() {
		const [,load] = demos.at(index())!
		return load()
	}

	const demoOp = use.op.fn(loadDemo)

	const click = (newIndex: number) => async() => {
		if (demoOp.isLoading) return null
		index(newIndex)
		demoOp.fn(loadDemo)
	}

	return html`
		<div class=pit>
			${loader(demoOp, DemoView => DemoView.attr("class", "demo")())}
		</div>

		<nav>
			${demos.map(([name], i) => html`
				<button
					@click="${click(i)}"
					?disabled="${demoOp.isLoading || index() === i}">
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

.pit {
	background: var(--bg2);
	border: solid 1px #fff1;
	border-top: solid 1px #fff0;
	border-bottom: solid 1px #fff4;
	box-shadow:
		inset 0.2em 0.3em 1em #0008,
		inset 0.2em 0.3em 5em #0004;
	border-radius: 1em;
}

.pit {
	flex: 1 1 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.demo {
		width: 100%;
		height: 100%;
	}

	[view="loading"] {
		color: green;
		font-size: 2em;
	}

	[view="error"] {
		color: orange;
		font-size: 2em;
	}
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

