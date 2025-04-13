import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { ExternalModuleModel } from './ExternalModuleModel';
import type { PaginationResult } from './PaginationResult';

type Params = {
	text?: string;
	sort?: string;
	cursor?: string;
};

export async function getExternalModulesData(
	params: Params,
): Promise<PaginationResult<ExternalModuleData>> {
	const { cursor, sort, text } = params;

	const pageLimit = 3;
	const limit = pageLimit + 1;

	const query = ExternalModuleModel.find();
	query.limit(limit);

	if (text) {
		query.where({ $text: { $search: text } });
	}

	// TODO use Strategy pattern
	if (!sort) {
		if (text) {
			query.select({ score: { $meta: 'textScore' } });
			query.sort({ score: { $meta: 'textScore' } });
			query.sort({ _id: -1 });

			if (cursor) {
				const cursorData = JSON.parse(cursor);

				query.where({
					$or: [
						{ score: { $lt: cursorData.score } },
						{ score: cursorData.score, _id: { $lt: cursorData._id } },
					],
				});
			}
		} else {
			// The order matters
			query.sort([['_id', 'desc']]);
			if (cursor) {
				const cursorData = JSON.parse(cursor);
				query.where({
					$or: [{ _id: { $lte: cursorData._id } }],
				});
			}
		}
	} else if (sort === 'likeCount') {
		// The order matters
		query.sort([
			['likeCount', 'desc'],
			['_id', 'desc'],
		]);
		if (cursor) {
			const cursorData = JSON.parse(cursor);
			query.where({
				$or: [
					{ likeCount: { $lt: cursorData.likeCount } },
					{ likeCount: cursorData.likeCount, _id: { $lte: cursorData._id } },
				],
			});
		}
	} else if (sort === 'updatedAt') {
		// The order matters
		query.sort([
			['updatedAt', 'desc'],
			['_id', 'desc'],
		]);
		if (cursor) {
			const cursorData = JSON.parse(cursor);
			query.where({
				$or: [
					{ updatedAt: { $lt: cursorData.updatedAt } },
					{ updatedAt: cursorData.updatedAt, _id: { $lte: cursorData._id } },
				],
			});
		}
	} else {
		throw new Error('Invalid sorting option:' + sort);
	}

	query.populate('user');
	const documents = await query;
	const items = documents.map((d) => d.toObject());
	console.log(items.map((item) => [item.name, item.score]));

	let nextCursor: null | string = null;
	const hasNext = items.length === limit;
	if (hasNext) {
		const lastItem = items.at(-1)!;
		// TODO use Strategy pattern
		if (!sort) {
			if (text) {
				nextCursor = JSON.stringify({
					_id: lastItem._id,
					score: lastItem.score,
				});
			} else {
				nextCursor = JSON.stringify({
					_id: lastItem._id,
				});
			}
		} else if (sort === 'likeCount') {
			nextCursor = JSON.stringify({
				_id: lastItem._id,
				likeCount: lastItem.likeCount,
			});
		} else if (sort === 'updatedAt') {
			nextCursor = JSON.stringify({
				_id: lastItem._id,
				updatedAt: lastItem.updatedAt,
			});
		} else {
			throw new Error('Invalid sorting option: ' + sort);
		}
	}

	return {
		nextCursor,
		items: items.slice(0, pageLimit),
	};
}
