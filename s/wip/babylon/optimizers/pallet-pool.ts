
import {AssetContainer} from "@babylonjs/core/assetContainer.js"

import {Pool} from "./pool.js"
import {Pallet} from "../logistics/pallet.js"

export class PalletPool extends Pool<Pallet> {
	constructor(container: AssetContainer) {
		super(() => {
			const pallet = new Pallet(container)
			return {payload: pallet, noodle: pallet}
		})
	}
}

