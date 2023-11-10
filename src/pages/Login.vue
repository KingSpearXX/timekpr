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
              <label>Email:</label>
              <div class="form-item">
                <Icon icon="fa-regular fa-user" /><BaseText type="text" v-model="email" id="email" />
              </div>
              <br />
              <label>Password:</label>
              <div class="form-item">
                <Icon icon="fa-solid fa-lock" /><BaseText type="password" v-model="password" id="password" />
              </div>
              <p class="error" v-if="loginValidator">{{ loginValidator }}</p>
              <br />
              <BaseCheckbox v-model="rememberMe" label="Remember Me" id="rememberMe" />
              <br />
              <div class="form-button">
                <BaseButton @click="login" type="submit">Login</BaseButton>
                <p>
                  <RouterLink to="Register">Not yet registered?</RouterLink> or
                  <RouterLink to="Forgot">Forgot Password</RouterLink>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseText from '../components/BaseText.vue';
import BaseButton from '../components/BaseButton.vue';
import BaseCheckbox from '@/components/BaseCheckbox.vue';
import Icon from '../components/Icon.vue';

import {ref} from 'vue';
import {getAuth, setPersistence} from 'firebase/auth';
import {signInWithEmailAndPassword, browserSessionPersistence, browserLocalPersistence} from 'firebase/auth';
import {usersStore} from '../store/Users';
import {siteStore} from '../store/Site';

const auth = getAuth();
const users = usersStore();
const site = siteStore();

const email = ref('');
const password = ref('');
const loginValidator = ref('');
const rememberMe = ref(false);

const login = async () => {
  site.setLoading(true);
  if (email.value == '' || password.value == '') {
    loginValidator.value = 'Please enter your email and password';
    site.setLoading(false);
    return;
  }
  try {
    setPersistence(auth, rememberMe.value ? browserLocalPersistence : browserSessionPersistence).then(() => {
      console.log('rememberMe: ' + rememberMe.value);
      signInWithEmailAndPassword(auth, email.value, password.value).then(userCredentials => {
        users.user = userCredentials.user;
      });
    });
  } catch (error) {
    if (error.message === 'Firebase: Error (auth/invalid-login-credentials).') {
      loginValidator.value = 'Invalid email or password';
    } else if (error.message === 'Firebase: Error (auth/user-not-found).') {
      loginValidator.value = 'User not found';
    } else {
      loginValidator.value = error.message;
    }
  }
  site.setLoading(false);
};
</script>

<style scoped>
body {
  overflow: hidden;
}
button {
  width: 30%;
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
.base-checkbox {
  color: #fff;
  font-size: 1.25em;
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
  .base-checkbox {
    color: #223843;
    font-size: 1.25em;
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
