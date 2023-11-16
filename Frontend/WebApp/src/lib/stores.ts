import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const user: Writable<{}> = localStorageStore('user', {
	jwt: '',
	email: '',
	firstName: '',
	lastName: '',
	eligibility: {},
	eligiblePrograms: [],
	registeredPrograms: [],
	pendingPrograms: [],
	language: []
});
