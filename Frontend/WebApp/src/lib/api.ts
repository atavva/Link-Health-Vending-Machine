export const API_URL = 'http://127.0.0.1:3000/api';

export async function fetchFields() {
	const response = await fetch(API_URL + '/eligibility');
	if (response.ok) {
		const data = await response.json();
            return data.data.eligibility;
	} else {
		throw new Error('Failed to fetch eligibility data');
	}
}

export function updateUserElig(obj: string) {
	// this *obj should be the eligbility option
}
