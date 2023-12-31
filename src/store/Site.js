import {defineStore} from 'pinia';

export const siteStore = defineStore('site', {
  state: () => ({
    loading: false,
    admin: false,
  }),
  actions: {
    setLoading(loading) {
      this.loading = loading;
    },
  },
});

export {siteStore as default};
