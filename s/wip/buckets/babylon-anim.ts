
import {Bucket} from "./buckets.js"
import {AnimationGroup} from "@babylonjs/core/Animations/animationGroup.js"

export class BabylonAnimBucket extends Bucket {
	previousWeight = 0

	constructor(public animationGroup: AnimationGroup) {
		super()
		this.actualize()
	}

	actualize() {
		this.animationGroup.weight = this.water < 0.001
			? 0
			: this.water
	}

	fill(amount: number) {
		const overflow = super.fill(amount)
		this.actualize()
		return overflow
	}

	goToFrame(frame: number, useWeights: boolean) {
		const weight = this.animationGroup.weight
		const changed = weight !== this.previousWeight
		if (useWeights && (this.animationGroup.weight > 0 || changed))
			this.animationGroup.goToFrame(frame, useWeights)
		this.previousWeight = weight
	}

	goToFraction(fraction: number, useWeights: boolean) {
		const {from, to} = this.animationGroup
		const durationFrames = (to - from)
		const frame = from + (durationFrames * fraction)
		this.goToFrame(frame, useWeights)
	}
}

