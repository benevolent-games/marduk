
import {Scalar} from "@benev/math"
import {Science, expect} from "@e280/science"
import {Bucket, BucketShare, BucketStack} from "./buckets.js"

const nearly = (x: number, y: number) => Scalar.isNear(x, y, 0.001)

export default Science.suite({

	async "stack allocations"() {
		const a = new Bucket()
		const b = new Bucket()
		const buckets = new BucketStack([a, b])
		a.capacity = 0.8
		b.capacity = 1
		buckets.fill(1)
		expect(nearly(a.water, 0.8)).ok()
		expect(nearly(b.water, 0.2)).ok()
	},

	async "nested stack allocations"() {
		const a = new Bucket()
		const b = new Bucket()
		const c = new Bucket()
		const stack = new BucketStack([
			new BucketStack([
				a,
				b,
			]),
			c,
		])
		a.capacity = 0.2
		b.capacity = 0.2
		c.capacity = 1
		stack.fill(1)
		expect(nearly(a.water, 0.2)).ok()
		expect(nearly(b.water, 0.2)).ok()
		expect(nearly(c.water, 0.6)).ok()
	},

	async "bucket share distributes evenly"() {
		const a = new Bucket()
		const b = new Bucket()
		const c = new Bucket()
		const buckets = new BucketShare([a, b, c])

		buckets.fill(3)

		expect(nearly(a.water, 1)).ok()
		expect(nearly(b.water, 1)).ok()
		expect(nearly(c.water, 1)).ok()
	},

	async "bucket share handles overflow"() {
		const a = new Bucket()
		const b = new Bucket()
		const c = new Bucket()
		const buckets = new BucketShare([a, b, c])

		a.capacity = 0.8
		b.capacity = 1
		c.capacity = 1

		const overflow = buckets.fill(3)

		expect(nearly(a.water, 0.8)).ok()
		expect(nearly(b.water, 1)).ok()
		expect(nearly(c.water, 1)).ok()
		expect(nearly(overflow, 0.2)).ok() // total capacity = 2.8, so 0.2 overflows
	},

	async "bucket share redistributes overflow"() {
		const a = new Bucket()
		const b = new Bucket()
		const c = new Bucket()
		const d = new Bucket()
		const buckets = new BucketShare([a, b, c, d])

		a.capacity = 0.5
		b.capacity = 0.5
		c.capacity = 0.5
		d.capacity = 1

		const overflow = buckets.fill(2)

		expect(nearly(a.water, 0.5)).ok()
		expect(nearly(b.water, 0.5)).ok()
		expect(nearly(c.water, 0.5)).ok()
		expect(nearly(d.water, 0.5)).ok() // final bucket absorbs remaining
		expect(nearly(overflow, 0)).ok() // no water left to overflow
	},
})

