<template>
  <div class="site-container">
    <div class="component-flex">
      <div class="logo-container">
        <div class="logo slide-in"><Icon icon="fa-regular fa-clock" /> timekpr</div>
      </div>
      <div class="card-container">
        <div class="form-container login slide-in">
          <h1><Icon icon="fa-solid fa-user-plus" /> Register an Account</h1>
          <form @submit.prevent>
            <div class="form-cell">
              <label>Email:</label>
              <div class="form-item">
                <Icon icon="fa-regular fa-user" /><BaseText
                  type="text"
                  placeholder="Email"
                  v-model="email"
                  id="email"
                />
              </div>
              <p class="error" v-if="emailValidator">{{ emailValidator }}</p>
              <label>Password:</label>
              <div class="form-item">
                <Icon icon="fa-solid fa-lock" /><BaseText
                  type="password"
                  placeholder="••••••••"
                  v-model="password"
                  id="password"
                />
              </div>
              <label>Confirm Password:</label>
              <div class="form-item">
                <Icon icon="fa-solid fa-lock" /><BaseText
                  type="password"
                  placeholder="••••••••"
                  v-model="cpassword"
                  id="confirmPassword"
                />
              </div>
              <p class="error" v-if="passwordValidator">{{ passwordValidator }}</p>
              <label>First Name:</label>
              <div class="form-item">
                <Icon icon="fa-solid fa-lock" /><BaseText
                  type="test"
                  placeholder="First Name"
                  v-model="first_name"
                  id="firstName"
                />
              </div>
              <label>Last Name:</label>
              <div class="form-item">
                <Icon icon="fa-solid fa-lock" /><BaseText
                  type="test"
                  placeholder="Last Name"
                  v-model="last_name"
                  id="lastName"
                />
              </div>
              <p class="error" v-if="nameValidator">{{ nameValidator }}</p>
              <label>Mobile Number:</label>
              <div class="form-item">
                <Icon icon="fa-solid fa-lock" />
                <BaseText
                  type="Text"
                  placeholder="+639XX-XXX-XXXX"
                  v-mask="'+639##-###-####'"
                  v-model="mobile_number"
                  id="mobileNumber"
                />
              </div>
              <p class="error" v-if="mobileValidator">{{ mobileValidator }}</p>
              <br />
              <div class="form-button">
                <BaseButton @click="register" type="submit"
                  ><Icon icon="fa-solid fa-user-plus" /> Create Account</BaseButton
                >
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import BaseText from '../components/BaseText.vue';
import BaseButton from '../components/BaseButton.vue';
import Icon from '../components/Icon.vue';
import {siteStore} from '../store/Site.js';
import {getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification} from 'firebase/auth';
import {getDatabase, ref as dbRef, set} from 'firebase/database';

const site = siteStore();

const nameValidator = ref('');
const mobileValidator = ref('');
const emailValidator = ref('');
const passwordValidator = ref('');
const errorMessage = ref('');

const first_name = ref('');
const last_name = ref('');
const mobile_number = ref('');
const email = ref('');
const password = ref('');
const cpassword = ref('');

function register() {
  site.setLoading(true);
  // Validation of the fields
  let validated = true;
  if (!validateName()) validated = false;
  if (!validateMobile()) validated = false;
  if (!validateEmail()) validated = false;
  if (!validatePassword()) validated = false;

  if (validated) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(userCredential => {
        updateProfile(auth.currentUser, {
          displayName: first_name.value + ' ' + last_name.value,
        });
        const db = getDatabase();
        set(dbRef(db, 'users/' + userCredential.user.uid), {
          phoneNumber: mobile_number.value.replace(/-/g, ''),
        });
        sendEmailVerification(auth.currentUser);
        site.setLoading(false);
      })
      .catch(error => {
        if (error.message === 'Firebase: Error (auth/email-already-in-use).')
          emailValidator.value = 'Email already in use.';
        else errorMessage.value = error.message;
        site.setLoading(false);
      });
  } else {
    site.setLoading(false);
  }
}
function validateName() {
  // Validation of the name
  if (first_name.value.length < 2 || last_name.value.length < 2) {
    nameValidator.value = 'Name must be at least 2 characters long.';
    return false;
  } else {
    nameValidator.value = null;
    first_name.value = first_name.value.charAt(0).toUpperCase() + first_name.value.slice(1);
    last_name.value = last_name.value.charAt(0).toUpperCase() + last_name.value.slice(1);
    return true;
  }
}
function validateMobile() {
  // Validation of the mobile number
  if (mobile_number.value.length != 15) {
    mobileValidator.value = 'Mobile number is invalid.';
    return false;
  } else {
    mobileValidator.value = null;
    return true;
  }
}
function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Validation of the email
  if (!emailRegex.test(email.value)) {
    emailValidator.value = 'Email is invalid.';
    return false;
  } else {
    emailValidator.value = null;
    return true;
  }
}
function validatePassword() {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/\\]).{8,}$/;
  // Validation of the password
  if (!passwordRegex.test(password.value)) {
    passwordValidator.value =
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
    return false;
  } else if (password.value != cpassword.value) {
    passwordValidator.value = 'Passwords do not match.';
    return false;
  } else {
    passwordValidator.value = null;
    return true;
  }
}
</script>

<style scoped>
body {
  overflow: auto;
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
.card-container {
  width: 80%;
  height: 100vh;
  background-color: #a3bac3;
  border-radius: 0px;
  padding: 10px;
}
.component-flex {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  height: 100%;
}
.form-button {
  width: 98%;
  border-radius: 10px;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
  margin-top: 10px;
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
  width: 1%;
  margin-left: 10px;
  margin-right: 20px;
}
.form-item input {
  border: none;
  margin-left: 10px;
  font-weight: bolder;
  width: 80%;
}
.logo-container {
  width: 20%;
  height: 100vh;
  display: flex;
  margin-top: -3em;
  justify-content: center;
  align-items: flex-end;
}
.logo {
  font-family: Ubuntu;
  font-size: 2em;
  font-weight: bolder;
  color: #01a7c2;
}
.site-container {
  margin: 0px;
  padding: 0px;
}

@media screen and (max-width: 820px) {
  body {
    overflow: hidden;
  }
  button {
    width: 100%;
  }
  form {
    height: auto;
  }
  h1 {
    font-size: 1.5em;
  }
  .form-button {
    flex-direction: column;
  }
  .form-cell label {
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .form-item {
    width: 98%;
    padding: 0px;
  }
  .form-item i {
    margin-right: 20px;
  }
  .logo {
    font-size: 2em;
  }
  .logo-container {
    height: 25%;
    width: 90%;
    align-items: center;
    justify-content: flex-start;
  }
  .card-container {
    width: 90%;
    height: 50%;
    margin-top: -20%;
    background-color: transparent;
  }
  .card-container label {
    color: #223843;
  }
  .component-flex {
    flex-direction: column;
    align-items: center;
  }
}
</style>
