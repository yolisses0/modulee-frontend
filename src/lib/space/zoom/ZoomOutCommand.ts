import type { Command } from '$lib/shortcut/Command';
import { type ZoomContext } from '$lib/space/zoom/zoomContext';

export class ZoomOutCommand implements Command {
	constructor(
		private contexts: {
			zoomContext: ZoomContext;
		},
	) {}

	execute() {
		this.contexts.zoomContext.zoom -= 1;
	}
}
