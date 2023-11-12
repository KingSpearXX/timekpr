<template>
  <div>
    <h1><Icon icon="fa-solid fa-user" /> Manage Users</h1>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import BaseText from '../components/BaseText.vue';
import BaseButton from '../components/BaseButton.vue';
import Icon from '../components/Icon.vue';
import NavMenu from '@/components/NavMenu.vue';
</script>

<script>
/*

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
*/
</script>
