
import {Spawn} from "../../tools/lifecycler.js"
import {FigmentId, FigmentSpawners, FigmentSpec, FigmentTuple} from "./types.js"

export function consolidateSpawners<Fs extends FigmentSpec>(
		spawners: FigmentSpawners<Fs>
	): Spawn<FigmentId, FigmentTuple<Fs>> {

	return (id, [kind, data]) => {
		const life = spawners[kind](id, data)
		return {
			update: ([,data]) => life.update(data),
			dispose: () => life.dispose(),
		}
	}
}

