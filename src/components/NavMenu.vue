<template>
  <div class="NavMenu" v-if="siteAdmin != false && siteAdmin != null">
    <ul>
      <li @click="this.$emit('toggleMenuChild', '')">
        <Icon icon="fa-solid fa-house" />
        <p>HOME</p>
      </li>
      <li @click="this.$emit('toggleMenuChild', 'time')">
        <Icon icon="fa-regular fa-calendar-days" />
        <p>TIME-LOGS</p>
      </li>
      <li>
        <Icon icon="fa-solid fa-wallet" />
        <p><router-link to="/">WALLET</router-link></p>
      </li>
      <li>
        <Icon icon="fa-solid fa-gear" />
        <p><router-link to="/">SETTINGS</router-link></p>
      </li>
      <li @click="this.$emit('toggleMenuChild', 'users')">
        <Icon icon="fa-solid fa-user" />
        <p><router-link to="/">USERS</router-link></p>
      </li>
      <li @click="logout">
        <Icon icon="fa-solid fa-person-running" />
        <p><a href="/" @click="logout">LOGOUT</a></p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import Icon from './Icon.vue';
import {computed} from 'vue';
import {getAuth, signOut} from 'firebase/auth';
import {siteStore} from '../store/Site.js';

const site = siteStore();

const siteAdmin = computed(() => site.admin);

function logout() {
  try {
    const auth = getAuth();
    signOut(auth);
  } catch (error) {
    console.error(error);
  }
}
</script>

<style scoped>
.NavMenu ul {
  margin: 0px;
  padding: 0px;
}
.NavMenu li {
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.15em;
  background-color: #a3bac3;
  margin-bottom: -5px;
}
.NavMenu li:active {
  background-color: #eaebed;
}
.NavMenu i {
  margin-left: 25%;
  margin-right: 10px;
  color: #223843;
}
.NavMenu li a {
  text-decoration: none;
  color: #223843;
}
@media screen and (max-width: 820px) {
  .NavMenu {
    background-color: #a3bac3;
    opacity: 0.9;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
  }
  .NavMenu ul {
    opacity: 1;
    height: 100vh;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0px;
    padding: 0px;
    gap: 3px;
    align-content: center;
    justify-content: center;
  }
  .NavMenu li {
    width: 25%;
    height: 100px;
    padding: 10px;
    list-style: none;
    color: #fff;
    font-size: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .NavMenu li:active {
    background-color: transparent;
  }
  .NavMenu i {
    font-size: 3em;
    padding: 0px;
    color: #fff;
    margin-left: 0px;
    margin-right: 0px;
  }
  .NavMenu i:active {
    color: #11aaff;
  }

  .NavMenu li a {
    color: #fff;
    text-decoration: none;
    margin-top: 40px;
  }
}
</style>
