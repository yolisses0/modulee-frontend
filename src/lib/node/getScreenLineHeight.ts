import type { Space } from '$lib/space/Space';
import { Vector } from 'nodes-editor';

export function getScreenLineHeight(space: Space) {
	return space.getScreenSize(Vector.one()).y;
}
