<template>
  <div class="site-container">
    <div class="component-flex">
      <div class="logo-container">
        <div class="logo slide-in"><Icon icon="fa-regular fa-clock" /> timekpr</div>
      </div>
      <div class="card-container">
        <div class="form-container login slide-in">
          <form @submit.prevent>
            <div class="form-cell">
              <h1><Icon icon="fa-sharp fa-solid fa-person-circle-question" /> User not yet verified!</h1>
              <p>
                Please check your email and also your spam folder for a verification email. If you have not received a
                verification email please click the button below to resend the verification email.
              </p>
              <p>{{ emailSent }}</p>
              <br />
              <div class="form-button">
                <BaseButton @click="verify" type="button">Resend Verification Email</BaseButton>
              </div>
              <div class="form-button">
                <BaseButton @click="logout" type="button">Logout</BaseButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '../components/BaseButton.vue';
import Icon from '../components/Icon.vue';

import {getAuth, sendEmailVerification, signOut} from 'firebase/auth';
import {usersStore} from '../store/Users';
import {ref} from 'vue';
import siteStore from '@/store/Site';

const users = usersStore().user;
const emailSent = ref('');

async function logout() {
  try {
    const auth = getAuth();
    await signOut(auth);
    users.user = null;
  } catch (error) {
    console.error(error);
  }
}
function verify() {
  siteStore().setLoading(true);
  var user = getAuth().currentUser;

  sendEmailVerification(user)
    .then(() => {
      emailSent.value = `Email Sent! to ${user.email}`;
    })
    .catch(error => {
      emailSent.value = `Error: ${error}`;
    });
  siteStore().setLoading(false);
}
</script>

<style scoped>
body {
  overflow: hidden;
}
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
  height: 100vh;
  background-color: #a3bac3;
  border-radius: 0px;
  padding: 10px;
}
.component-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
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
  height: 100vh;
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
