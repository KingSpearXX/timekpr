<template>
  <div id="app">
    <Loader v-if="loading" />
    <router-view></router-view>
  </div>
</template>

<script setup>
import Loader from './components/Loader.vue';
import {siteStore} from './store/Site.js';
import {usersStore} from './store/Users.js';
import {ref, computed, watch} from 'vue';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {useRouter} from 'vue-router';

const site = siteStore();
const users = computed(() => {
  let user = usersStore().user;
  return user;
});
const router = useRouter();

const loading = computed(() => site.loading);

watch(users, (newValue, oldValue) => {
  console.log('oldvalue' + oldValue);
  console.log('newvalue' + newValue);
  if (!oldValue && newValue) {
    router.push('/');
  } else {
    router.push('/login');
  }
});

const auth = getAuth();
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto&family=Ubuntu:wght@300&display=swap');
@import url('./assets/base.css');
</style>
