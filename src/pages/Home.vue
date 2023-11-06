<template>
  <div class="home">Hello</div>
  <div class="home">Number</div>
  <button class="logout" @click="logout">logout</button>
</template>

<script setup>
import {ref, computed} from 'vue';
import {getAuth, signOut} from 'firebase/auth';
import {usersStore} from '../store/Users';
import {useRouter} from 'vue-router';

import {getDatabase, ref as dbRef, onValue} from 'firebase/database';

const router = useRouter();
const auth = getAuth();

const users = usersStore();

const db = getDatabase();
const phoneNumber = dbRef(db, 'users/' + users.user.uid + '/phoneNumber');
onValue(phoneNumber, snapshot => {
  console.log(snapshot.val());
});

async function logout() {
  try {
    await signOut(auth);
    users.user = null;
  } catch (error) {
    console.error(error);
  }
}
</script>
