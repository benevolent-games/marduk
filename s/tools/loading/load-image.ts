
export async function loadImage(src: string, alt = "") {
	return await new Promise<HTMLImageElement>((resolve, reject) => {
		const img = document.createElement("img")
		img.src = src
		img.alt = alt
		img.loading = "eager"
		img.onload = () => resolve(img)
		img.onerror = reject
	})
}

export function loadImage2(src: string, alt = "") {
	const element = document.createElement("img")
	element.src = src
	element.alt = alt
	element.loading = "eager"
	const promise = new Promise<HTMLImageElement>((resolve, reject) => {
		element.onload = () => resolve(element)
		element.onerror = reject
	})
	return {element, promise}
}

