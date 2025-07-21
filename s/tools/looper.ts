
export function looper(fn: () => Promise<void>) {
	let stop = false
	const alpha = async() => {
		if (stop) return undefined
		await fn()
		setTimeout(alpha, 0)
	}
	alpha()
	return () => { stop = true }
}

