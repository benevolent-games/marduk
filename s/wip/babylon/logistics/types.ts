
import {Quat, Vec3} from "@benev/math"

export type Spatial = {
	position: Vec3
	rotation: Quat
	scale: Vec3
}

export type ManifestQuery = Record<string, string | boolean>

