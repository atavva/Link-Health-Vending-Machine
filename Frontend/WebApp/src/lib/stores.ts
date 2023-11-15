import { localStorageStore } from '@skeletonlabs/skeleton';
import { writable } from 'svelte/store';

  export const languagePreference = writable('en');
  export const user = writable({
    "jwt" : "",
    "email" : "",
    "firstName" : "",
    "lastName" : "",
    "eligibility": {},
    "eligiblePrograms" : [],
    "registeredPrograms" : [],
    "pendingPrograms" : []
  });
