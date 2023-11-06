<template>
  <div class="site-container container-alignment">
    <div class="site-card card-size">
      <div class="component-flex">
        <div class="form-cell">
          <h1><Icon icon="fa-solid fa-user-plus" /> Create Account:</h1>
          <hr />
        </div>
        <div class="form-cell profile">
          <div>
            <label><Icon icon="fa-regular fa-user" /> First Name:</label>
            <BaseText type="Text" placeholder="First Name" v-model="first_name" id="firstName" />
          </div>
          <div>
            <label><Icon icon="fa-regular fa-user" /> Last Name:</label>
            <BaseText type="Text" placeholder="Last Name" v-model="last_name" id="lastName" />
          </div>
        </div>
        <p class="error">{{ nameValidator }}</p>
        <div class="form-cell">
          <label><Icon icon="fa-solid fa-mobile-screen" /> Cellphone Number:</label>
          <BaseText
            type="Text"
            placeholder="+639XX-XXX-XXXX"
            v-mask="'+639##-###-####'"
            v-model="mobile_number"
            id="mobileNumber"
          />
          <p class="error">{{ mobileValidator }}</p>
          <hr />
        </div>

        <div class="form-cell">
          <label><Icon icon="fa-regular fa-envelope" /> Username (Email):</label>
          <BaseText type="Email" placeholder="Email" v-model="email" id="email" />
          <p class="error">{{ emailValidator }}</p>
        </div>
        <div class="form-cell">
          <label>Nominated Password:</label>
          <BaseText type="Password" placeholder="••••••••" v-model="password" id="password" />
          <label>Cofirm Nominated Password:</label>
          <BaseText type="Password" placeholder="••••••••" v-model="cpassword" id="confirmPassword" />
          <p class="error">{{ passwordValidator }}</p>
        </div>
        <div class="form-cell">
          <BaseButton @click="register"><Icon icon="fa-solid fa-user-plus">"></Icon> Register Account</BaseButton>
          <p class="error">{{ errorMessage }}</p>
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
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
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

<style>
.container-alignment {
  display: flex;
  justify-content: center;
  align-items: center;
}
.component-flex {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
.component-flex p {
  margin-top: 2px;
  font-size: 0.8em;
}
.card-size {
  width: 75%;
}
.form-cell {
  width: 100%;
}
.form-cell input {
  width: 100%;
}
.form-cell button {
  width: 100%;
}
.profile {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 0.5em;
}
.profile div {
  width: 100%;
}
.profile label {
  margin-top: 15px;
}
.profile input {
  width: 100%;
}
@media screen and (max-width: 768px) {
  .card-size {
    width: 90%;
  }
  .component-flex {
    flex-direction: column;
  }
  .profile {
    flex-direction: column;
  }
  .profile input {
    width: 100%;
    align-self: flex-end;
  }
}

@media screen and (max-width: 820px) {
  .card-size {
    width: 80%;
  }
  .component-flex {
    flex-direction: column;
  }
  .profile {
    flex-direction: column;
  }
  .profile input {
    width: 100%;
    align-self: flex-end;
  }
}
</style>
