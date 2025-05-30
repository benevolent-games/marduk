
import "@benev/slate/x/node.js"
import {template, html, easypage, git_commit_hash, read_file, unsanitized, renderSocialCard, read_json} from "@benev/turtle"

const version = (await read_json("package.json")).version
const domain = "marduk.benevolent.games"
const favicon = "/assets/b.svg"
const description = "babylonjs rendering toolkit"

export default template(async basic => {
	const path = basic.path(import.meta.url)
	const hash = await git_commit_hash()

	return easypage({
		path,
		dark: true,
		title: "@benev/marduk",
		head: html`
			<link rel="icon" href="${favicon}"/>
			<style>${unsanitized(await read_file("x/demo/main.css"))}</style>
			<meta data-commit-hash="${hash}"/>
			<meta data-version="${version}"/>

			${renderSocialCard({
				themeColor: "#f2ea8e",
				siteName: domain,
				title: "@benev/marduk",
				description,
				image: `https://${domain}${favicon}`,
				url: `https://${domain}/`,
			})}

			<script type=module src="demo/main.bundle.js"></script>
		`,
		body: html`
			<section>
				<header class=title>
					<small>👁️👁️👁️</small>
					<h1>@benev/marduk</h1>
					<small>👁️👁️👁️</small>
				</header>
				<p>${version}</p>
				<p>see it on <a href="https://github.com/benevolent-games/marduk">github</a></p>

				<marduk-thunder></marduk-thunder>
			</section>
		`,
	})
})

