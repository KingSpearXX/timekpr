import {defineStore} from 'pinia';

export const usersStore = defineStore('users', {
  state: () => ({
    user: null,
  }),
  actions: {},
});

export {usersStore as default};
