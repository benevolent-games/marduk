
import "@benev/slate/x/node.js"
import {template, html, easypage, headScripts, git_commit_hash, read_file, unsanitized, renderSocialCard, read_json} from "@benev/turtle"

const domain = "bab.benevolent.games"
const favicon = "/assets/b.svg"
const description = "toolkit for making babylonjs games"

export default template(async basic => {
	const path = basic.path(import.meta.url)
	const hash = await git_commit_hash()

	return easypage({
		path,
		dark: true,
		title: "@benev/bab",
		head: html`
			<link rel="icon" href="${favicon}"/>
			<style>${unsanitized(await read_file("x/demo/style.css"))}</style>
			<meta data-commit-hash="${hash}"/>
			<meta data-version="${(await read_json("package.json")).version}"/>

			${renderSocialCard({
				themeColor: "#f2ea8e",
				siteName: domain,
				title: "@benev/bab",
				description,
				image: `https://${domain}${favicon}`,
				url: `https://${domain}/`,
			})}

			${headScripts({
				devModulePath: await path.version.root("demo/main.bundle.js"),
				prodModulePath: await path.version.root("demo/main.bundle.min.js"),
				importmapContent: await read_file("x/importmap.json"),
			})}
		`,
		body: html`
			<section>
				<h1>@benev/bab</h1>
				<p>see it on <a href="https://github.com/benevolent-games/bab">github</a></p>
			</section>
		`,
	})
})

