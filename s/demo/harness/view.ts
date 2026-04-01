
import {css, html} from "lit"
import {
	cssReset,
	loaders,
	shadow,
	type ShadowView,
	type View,
	useCss,
	useName,
	useOp,
	useSignal,
} from "@e280/sly"

export type Demo = [name: string, load: DemoFn]
export type DemoFn = () => Promise<{demoView: ShadowView<[]>, dispose: () => void}>

const loader = loaders.make(loaders.anims.earth)

export const DemoHarness = shadow((...demos: Demo[]) => {
	useName("harness")
	useCss(cssReset, stylesCss)

	const index = useSignal(0)

	async function loadDemo() {
		const [,load] = demos.at(index())!
		return load()
	}

	const demoOp = useOp(loadDemo)

	const click = (newIndex: number) => async() => {
		if (demoOp.isLoading) return null
		if (demoOp.isReady) demoOp.require().dispose()
		index(newIndex)
		await demoOp.load(loadDemo)
	}

	return html`
		<div class=pit>
			${loader(demoOp, ({demoView}) => demoView.with({
				props: [],
				attrs: {class: "demo"},
			}))}
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
		display: block;
		flex: 1 1 auto;
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
