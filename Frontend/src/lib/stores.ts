import { localStorageStore } from '@skeletonlabs/skeleton';
import type { writable } from 'svelte/store';

  export const languagePreference = writable('en');