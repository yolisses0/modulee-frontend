import { PUBLIC_AUTH_GOOGLE_ID } from '$env/static/public';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client();

export async function verifyGoogleCredential(credential: string) {
	const ticket = await client.verifyIdToken({
		idToken: credential,
		audience: PUBLIC_AUTH_GOOGLE_ID,
	});
	const payload = ticket.getPayload();
	if (!payload) throw new Error('Missing payload');
	return payload;
}
