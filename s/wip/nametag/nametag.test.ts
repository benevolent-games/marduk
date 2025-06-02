
import {Science, expect} from "@e280/science"
import {nametag} from "./nametag.js"

export default Science.suite({
	async "we can parse name"() {
		expect(nametag("").name).is("")
		expect(nametag("chase").name).is("chase")
		expect(nametag(" chase ").name).is("chase")
	},

	async "we can parse params"() {
		expect(nametag("::cool").has("cool")).is(true)
		expect(nametag("::cool").get("cool")).is(true)
		expect(nametag("::cool=").get("cool")).is(true)
		expect(nametag("::cool=abc").get("cool")).is("abc")
		expect(nametag("::cool=abc=123").get("cool")).is("abc=123")
		expect(nametag("::").has("")).is(false)
		expect(nametag("::=abc").size).is(0)
		expect(nametag("::=").size).is(0)
		expect(nametag("::cool::lol").size).is(2)
		expect(nametag("::cool=1::lol=2").size).is(2)
		expect(nametag(":: cool ").has("cool")).is(true)
	},

	async "we can parse meta"() {
		expect(nametag("").meta).is(null)
		expect(nametag(".").meta).is("")
		expect(nametag(".001").meta).is("001")
		expect(nametag(".lol.001").meta).is("lol.001")
		expect(nametag(". lol.001 ").meta).is("lol.001")
	},

	async "we can parse underscored"() {
		expect(nametag("").underscored).is(null)
		expect(nametag("_").underscored).is("")
		expect(nametag("_primitive0").underscored).is("primitive0")
		expect(nametag("_lol_primitive0").underscored).is("lol_primitive0")
		expect(nametag("_ lol_primitive0 ").underscored).is("lol_primitive0")
		expect(nametag("chase.wasd::cool::lol.rofl.001_primitive0").underscored).is("primitive0")
	},

	async "we can parse wacky mixtures of stuff"() {
		{
			const x = nametag("::cool::lol.rofl.001")
			expect(x.name).is("")
			expect(x.size).is(2)
			expect(x.meta).is("rofl.001")
		}
		{
			const x = nametag("chase::cool::lol.rofl.001")
			expect(x.name).is("chase")
			expect(x.size).is(2)
			expect(x.meta).is("rofl.001")
		}
		{
			const x = nametag("chase.wasd::cool::lol.rofl.001")
			expect(x.name).is("chase")
			expect(x.size).is(0)
			expect(x.meta?.length)
		}
		{
			const x = nametag("chase ::cool ::lol .rofl .001 ")
			expect(x.name).is("chase")
			expect(x.size).is(2)
			expect(x.meta).is("rofl .001")
		}
	},

	async "we can construct new nametags"() {
		expect(nametag("").toString()).is("")
		expect(nametag("chase").toString()).is("chase")
		expect(nametag("chase::cool::lod=2.001").toString()).is( "chase::cool::lod=2.001")
		{
			const x = nametag("")
			x.name = "chase"
			x.set("cool", true)
			x.set("lod", "2")
			x.meta = "001"
			expect(x.toString()).is("chase::cool::lod=2.001")
		}
		{
			const x = nametag("")
			x.name = "chase"
			x.set("cool", "") // empty string equates to true
			x.set("lod", "2")
			x.meta = "001"
			expect(x.toString()).is("chase::cool::lod=2.001")
		}
	},

})

