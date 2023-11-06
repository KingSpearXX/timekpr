<template>
  <div class="site-container container-alignment">
    <div class="site-card card-size">
      <div class="component-flex">
        <div class="form-cell">
          <label>Username:</label>
          <BaseText type="Text" />
        </div>
        <div class="form-cell">
          <label>Password:</label>
          <BaseText type="Password" />
        </div>
        <div class="form-cell">
          <BaseButton @click="login">Login</BaseButton>
          <BaseButton @click="login">Login using Google</BaseButton>
        </div>
      </div>
      <div class="component-flex">
        <br />
        <p>No account yet? Click <RouterLink to="Register">here</RouterLink> to register!</p>
        <p><RouterLink to="Register"></RouterLink>Forgot Password?</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseText from '../components/BaseText.vue';
import BaseButton from '../components/BaseButton.vue';

/*import {ref} from 'vue';
import {getAuth} from 'firebase/auth';
import {getFirestore, doc, getDoc} from 'firebase/firestore';
import {signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {useRouter} from 'vue-router';
import {usersStore} from '../store/Users';

const router = useRouter();
const auth = getAuth();
const db = getFirestore();
const users = usersStore();

const email = ref('');
const password = ref('');

const googlePop = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).then(result => {
      users.user = result.user;
      router.push('/');
      console.log(result);
    });
    checkRole();
  } catch (error) {
    console.error(error);
  }
};

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value).then(userCredentials => {
      users.user = userCredentials;
      console.log(userCredentials);
    });
    checkRole();
  } catch (error) {
    console.error(error);
  }
};

async function checkRole() {
  const docRef = doc(db, 'settings', 'timekeeper');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let adminUserID = docSnap.get('adminUserID');
    if (adminUserID == auth.currentUser.uid) {
      console.log('admin');
    } else {
      console.log('not admin');
    }
  } else {
    // docSnap.data() will be undefined in this case
    console.log('No such document!');
  }
}*/
</script>

<style>
.container-alignment {
  display: flex;
  justify-content: center;
  align-items: center;
}
.component-flex {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
}
.component-flex p {
  margin-top: 2px;
  font-size: 0.8em;
}
.card-size {
  width: 30%;
}
.form-cell {
  width: 100%;
}
.form-cell input {
  width: 100%;
}
.form-cell button {
  width: 100%;
  margin-top: 5px;
}
@media screen and (max-width: 768px) {
  .card-size {
    width: 90%;
  }
  .component-flex {
    flex-direction: column;
  }
}
</style>
