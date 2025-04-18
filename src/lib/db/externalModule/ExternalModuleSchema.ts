import { Schema } from 'mongoose';
import { GraphSchema } from '../graph/GraphSchema';
import type { ExternalModuleDocument } from './ExternalModuleDocument';
import { VersionSchema } from './VersionSchema';

export const ExternalModuleSchema = new Schema<ExternalModuleDocument>(
	{
		version: VersionSchema,
		projectId: { type: String, required: true },
		likeCount: { type: Number, required: true },
		graph: { type: GraphSchema, required: true },
		usageCount: { type: Number, required: true },
		isSeeded: { type: Boolean, required: false },
		name: { type: String, required: true, maxlength: 100 },
		userId: { type: Schema.Types.ObjectId, required: true },
		description: { type: String, required: false, maxlength: 1000 },
	},
	{
		id: true,
		timestamps: true,
		toObject: {
			virtuals: true,
			flattenMaps: true,
			flattenObjectIds: true,
		},
	},
);

ExternalModuleSchema.virtual('user', {
	ref: 'User',
	justOne: true,
	foreignField: '_id',
	localField: 'userId',
});

ExternalModuleSchema.index({ likeCount: -1 });
ExternalModuleSchema.index({ usageCount: -1 });
ExternalModuleSchema.index({ name: 'text', description: 'text' });
