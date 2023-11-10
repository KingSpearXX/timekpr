<template>
  <div class="navbar">
    <div class="menu-toggle" id="mobile-menu" @click="toggleMenu">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <ul class="nav-list fade" v-if="showMenu">
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </div>
  <div class="content">
    <!-- Your page content goes here -->
    <p>This is your page content.</p>
    <p @click="logout">logout</p>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {getAuth, signOut} from 'firebase/auth';
import {usersStore} from '../store/Users';

import {getDatabase, ref as dbRef, onValue} from 'firebase/database';

const showMenu = ref(false);
const auth = getAuth();

const users = usersStore();

const db = getDatabase();
const phoneNumber = dbRef(db, 'users/' + users.user.uid + '/phoneNumber');
onValue(phoneNumber, snapshot => {
  console.log(snapshot.val());
});

function toggleMenu() {
  showMenu.value = !showMenu.value;
}

async function logout() {
  try {
    await signOut(auth);
    users.user = null;
  } catch (error) {
    console.error(error);
  }
}
</script>

<style scoped>
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
}

.navbar {
  background-color: #333;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-toggle {
  cursor: pointer;
  display: none;
}

.menu-toggle span {
  display: block;
  width: 30px;
  height: 3px;
  background-color: #fff;
  margin: 6px 0;
}

.nav-list {
  list-style-type: none;
  padding: 0;
  display: flex;
}

.nav-list li {
  margin-right: 20px;
}

.nav-list a {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
}

.content {
  padding: 20px;
}

@media screen and (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .nav-list {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    background-color: #333;
    width: 100%;
  }

  .nav-list.show {
    display: flex;
  }

  .nav-list li {
    margin-right: 0;
    text-align: center;
    padding: 10px;
  }
}
</style>
