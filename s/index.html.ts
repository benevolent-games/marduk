
import {template, html, dataSvgEmoji, socialCard} from "@e280/scute"

const title = "@benev/marduk"
const domain = "marduk.benevolent.games"
const favicon = "/assets/b.svg"
const description = "babylonjs rendering toolkit"

export default template(import.meta.url, async orb => html`
	<!doctype html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<meta name="viewport" content="width=device-width,initial-scale=1"/>
			<meta name="darkreader-lock"/>
			<style>@layer base{html{background:#000}}</style>
			<meta data-version="${orb.packageVersion()}" />

			<title>scute</title>
			<link rel="icon" href="${dataSvgEmoji("👑")}"/>
			<link rel="stylesheet" href="${orb.hashurl("demo/main.css")}"/>
			<script type="module" src="${orb.hashurl("demo/main.bundle.min.js")}"></script>

			${socialCard({
				title,
				description,
				themeColor: "#f2ea8e",
				siteName: domain,
				image: `https://${domain}${favicon}`,
			})}
		</head>
		<body>
			<header>
				<h1>@benev/marduk</h1>
				<div class=deets>
					<a href="https://github.com/benevolent-games/marduk">github</a>
					<a href="https://benevolent.games/">benevolent.games</a>
					<span>v${orb.packageVersion()}</span>
				</div>
			</header>
			<div class=app></div>
		</body>
	</html>
`)

