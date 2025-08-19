
import {ev, sub} from "@e280/stz"

export function makePointerlocker(...p: ConstructorParameters<typeof Pointerlocker>) {
	return new Pointerlocker(...p)
}

export class Pointerlocker {
	static make = (element: Element) => new this(element)

	onChange = sub<[locked: Element | null]>()

	dispose = ev(document, {
		pointerlockchange: () => this.onChange.pub(document.pointerLockElement),
		pointerlockerror: () => this.onChange.pub(document.pointerLockElement),
	})

	constructor(
		public element: Element,
		public options: {unadjustedMovement?: boolean} = {},
	) {}

	get isLocked() {
		return document.pointerLockElement === this.element
	}

	async lock() {
		if (!this.isLocked) {
			await this.element.requestPointerLock({
				unadjustedMovement: this.options.unadjustedMovement,
			})
		}
	}

	unlock() {
		if (document.pointerLockElement)
			document.exitPointerLock()
	}

	async toggle() {
		if (document.pointerLockElement) this.unlock()
		else await this.lock()
	}
}

