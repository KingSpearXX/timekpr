<template>
  <div id="app">
    <Loader v-if="loading" />
    <div v-if="users && users.emailVerified">
      <div class="site-container">
        <div class="component-flex">
          <div class="user-container">
            <div class="desktopMenu">
              <NavMenu @toggleMenuChild="toggleMenu" />
            </div>
            <NavMenu v-if="menuBar" @toggleMenuChild="toggleMenu" class="mobileMenu" />

            <div class="logo slide-in"><Icon icon="fa-regular fa-clock" /> timekpr</div>
            <div class="mobileMenu">
              <Icon icon="fa-solid fa-bars" @click="toggleMenu" />
            </div>
          </div>
          <div class="card-container">
            <div class="spacer">
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Icon from './components/Icon.vue';
import NavMenu from './components/NavMenu.vue';

import Loader from './components/Loader.vue';
import {siteStore} from './store/Site.js';
import {usersStore} from './store/Users.js';
import {ref, computed, watch} from 'vue';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {useRouter, useRoute} from 'vue-router';

const site = siteStore();
const users = computed(() => {
  let user = usersStore().user;
  return user;
});
const router = useRouter();
const menuBar = ref(false);

const loading = computed(() => site.loading);

function toggleMenu(data) {
  if (typeof data === 'string') router.push(`/${data}`);
  menuBar.value = !menuBar.value;
}

watch(users, (newValue, oldValue) => {
  if (!oldValue && newValue) {
    router.push('/');
  } else {
    router.push('/login');
  }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto&family=Ubuntu:wght@300&display=swap');
@import url('./assets/base.css');
</style>
