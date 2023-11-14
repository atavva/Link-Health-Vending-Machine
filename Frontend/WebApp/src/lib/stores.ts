import { localStorageStore } from '@skeletonlabs/skeleton';
import { writable } from 'svelte/store';

  export const languagePreference = writable('en');
  export const eligibilityOptions = writable({});
