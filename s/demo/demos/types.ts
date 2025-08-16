
export type Options = {
	plate: HTMLElement
}

export type Demo = (options: Options) => Promise<() => Promise<void>>

