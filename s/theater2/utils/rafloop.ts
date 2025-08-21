
export function rafloop(fn: () => Promise<void>) {
	let stop = false

	void async function loop() {
		if (stop) return
		await fn()
		requestAnimationFrame(loop)
	}()

	return () => {
		stop = true
	}
}

