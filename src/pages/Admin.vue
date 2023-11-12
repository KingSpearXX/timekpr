<template>
  <div class="site-container">
    <h1><Icon icon="fas fa-gear" /> System Initialization</h1>
    There is no admin set! please pick from the users below to be the admin.
    <BaseSelect v-model="selectedUser" :options="allUsers" />
    <form></form>
  </div>
</template>

<script setup>
import BaseText from '../components/BaseText.vue';
import BaseButton from '../components/BaseButton.vue';
import BaseSelect from '../components/BaseSelect.vue';
import Icon from '../components/Icon.vue';
import fbAdmin from '../services/FirebaseAdmin.js';
import {ref, computed, onBeforeMount} from 'vue';
import {getDatabase, ref as dbRef, onValue} from 'firebase/database';
import {siteStore} from '../store/Site.js';

const site = siteStore();
const allUsers = ref([]);
const selectedUser = ref(null);

onBeforeMount(() => {
  site.setLoading(true);
  fbAdmin.listAllUsers().then(users => {
    users.users.forEach(user => {
      allUsers.value.push({value: user.uid, label: user.displayName});
    });
  });
  site.setLoading(false);
});
</script>

<style scoped>
button {
  width: 100%;
  font-size: 1.25em;
  font-weight: bold;
  border-radius: 50px;
  border: 0px;
  padding: 0.5em;
}
form {
  width: 100%;
  height: 100vh;
  display: flex;
}
.card-container {
  width: 30%;
  background-color: #a3bac3;
  border-radius: 0px;
  padding-left: 10px;
  padding-right: 10px;
}
.component-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
}
.error {
  color: red;
}
.form-button {
  width: 98%;
  border-radius: 10px;
  padding: 3px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #eaebed;
}
.form-cell {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
}
.form-cell label {
  color: #fff;
  font-size: 1em;
  font-family: Ubuntu;
  margin-bottom: 10px;
}
.form-item {
  width: 98%;
  background-color: #fff;
  border-radius: 10px;
  padding: 3px;
  display: flex;
  align-items: center;
}
.form-item div {
  width: 100%;
}
.form-item i {
  width: 10%;
  margin-left: 10px;
}
.form-item input {
  border: none;
  margin-left: 10px;
  font-weight: bolder;
  width: 80%;
}
.logo-container {
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo {
  font-family: Ubuntu;
  font-size: 6em;
  font-weight: bolder;
  color: #01a7c2;
}
.site-container {
  margin: 0px;
  padding: 0px;
}

@media screen and (max-width: 820px) {
  form {
    height: auto;
  }
  body {
    overflow: hidden;
  }
  button {
    width: 100%;
  }
  .form-button {
    flex-direction: column;
  }
  .form-item {
    width: 98%;
  }
  .logo {
    font-size: 3.25em;
    display: flex;
    justify-content: center;
  }
  .logo-container {
    height: 40%;
    align-items: center;
  }
  .card-container {
    width: 90%;
    height: 43%;
    margin-top: -20%;
    background-color: transparent;
  }
  .card-container label {
    color: #223843;
  }
  .card-container p {
    color: #223843;
  }
  .component-flex {
    flex-direction: column;
    align-items: center;
  }
}
</style>
