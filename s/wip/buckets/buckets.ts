
import {Scalar} from "@benev/math"

export type Vessel = {
	water: number
	capacity: number
	fill(water: number): number
	dump(): void
}

export class Bucket implements Vessel {
	water = 0
	capacity = 1

	fill(amount: number) {
		this.water += amount
		if (this.water > this.capacity) {
			const overflow = this.water - this.capacity
			this.water = Scalar.clamp(this.water, 0, this.capacity)
			return overflow
		}
		return 0
	}

	dump() {
		this.water = 0
	}
}

export class BucketStack implements Vessel {
	constructor(public vessels: Vessel[]) {}

	get water() {
		return this.vessels.reduce((x, v) => x + v.water, 0)
	}

	get capacity() {
		return this.vessels.reduce((x, v) => x + v.capacity, 0)
	}

	fill(water: number) {
		for (const vessel of this.vessels) {
			if (water === 0)
				return 0
			water = vessel.fill(water)
		}
		return water
	}

	dump() {
		for (const vessel of this.vessels)
			vessel.dump()
	}

	cycle(water: number) {
		this.dump()
		this.fill(water)
	}
}

export class BucketShare extends BucketStack {
	fill(amount: number) {
		if (amount <= 0) return 0

		let remaining = amount
		let previousRemaining = Infinity // track previous remaining to detect convergence

		// repeat redistribution until no bucket overflows or no progress is made
		while (remaining > 0 && remaining < previousRemaining) {
			previousRemaining = remaining
			const share = remaining / this.vessels.length

			remaining = 0 // reset remaining, accumulate overflow
			for (const bucket of this.vessels) {
				const overflow = bucket.fill(share)
				remaining += overflow
			}
		}

		// remaining water is the contraption's overflow
		return remaining
	}
}

