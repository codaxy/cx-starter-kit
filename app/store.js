import {Store} from 'cx/data/Store';

export const store = new Store();

//load user info from session storage
store.set('user', {displayName: 'Test' });




