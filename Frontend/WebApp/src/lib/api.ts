import { user } from "./stores";

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

export function updateUserElig(currentUserObj: {}, userStore: {}) {

}

export async function getUserInfo(jwt) {
    try {
        const response = await fetch('/api/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation: ', error);
    }
}
