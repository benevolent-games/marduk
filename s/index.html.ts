
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

	// opengraph social card (optional)
	socialCard: {
		title,
		description,
		themeColor: "#f2ea8e",
		siteName: domain,
		image: `https://${domain}${favicon}`,
		url: `https://${domain}/`,
	},

	// content for your <body>
	body: html`
		<section>
			<header class=title>
				<small>👁️👁️👁️</small>
				<h1>@benev/marduk</h1>
				<small>👁️👁️👁️</small>
			</header>
			<p>${orb.packageVersion()}</p>
			<p>see it on <a href="https://github.com/benevolent-games/marduk">github</a></p>

			<marduk-theater></marduk-theater>
		</section>
	`,
}))

