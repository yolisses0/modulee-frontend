import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { PaginationStrategy } from './PaginationStrategy';

type CursorData = { _id: string; updatedAt: string };

export class UpdatedAtSortStrategy extends PaginationStrategy {
	getSort() {
		return { updatedAt: -1, _id: -1 } as const;
	}

	getFilter(cursorData: CursorData) {
		if (!cursorData) return {};
		return {
			$or: [
				{ updatedAt: { $lt: cursorData.updatedAt } },
				{ updatedAt: cursorData.updatedAt, _id: { $lte: cursorData._id } },
			],
		};
	}

	getNextCursor(lastItem: ExternalModuleData): CursorData {
		return {
			_id: lastItem._id,
			updatedAt: lastItem.updatedAt,
		};
	}
}
