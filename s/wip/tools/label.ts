
let count = 0

export function label(s: string) {
	return `${s}-${count++}`
}

