import { UserModel } from '$lib/user/UserModel';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { userId } = locals.session || {};
	const userData = (await UserModel.findById(userId))?.toObject();
	return { userData };
};
