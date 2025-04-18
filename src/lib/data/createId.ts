import { ID_LENGTH } from '$lib/data/ID_LENGTH';
import { customAlphabet } from 'nanoid';

const generator = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');

export function createId() {
	return generator(ID_LENGTH);
}
