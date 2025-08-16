
import {ssg, html} from "@e280/scute"

const title = "@benev/marduk"
const domain = "marduk.benevolent.games"
const favicon = "/assets/b.svg"
const description = "babylonjs rendering toolkit"

export default ssg.page(import.meta.url, async orb => ({
	title,
	js: "demo/main.bundle.min.js",
	css: "demo/main.css",
	dark: true,
	favicon,
	head: html`
		<meta data-version="${orb.packageVersion()}" />
	`,

	socialCard: {
		title,
		description,
		themeColor: "#f2ea8e",
		siteName: domain,
		image: `https://${domain}${favicon}`,
	},

	body: html`
		<header>
			<h1>@benev/marduk</h1>
			<div class=deets>
				<a href="https://github.com/benevolent-games/marduk">github</a>
				<a href="https://benevolent.games/">benevolent.games</a>
				<span>v${orb.packageVersion()}</span>
			</div>
		</header>
		<div class=app></div>
	`,
}))

