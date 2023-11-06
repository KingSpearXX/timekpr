<template>
  <div class="site-container">
    <div class="component-flex">
      <div class="logo-container">
        <div class="logo">timekeeper</div>
      </div>
      <div class="card-container">b</div>
    </div>
  </div>
</template>

<script setup>
import BaseText from '../components/BaseText.vue';
import BaseButton from '../components/BaseButton.vue';

import {ref} from 'vue';
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

/*const googlePop = async () => {
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
};*/

const login = async () => {
  console.log('login');
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value).then(userCredentials => {
      users.user = userCredentials.user;
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
}
</script>

<style>
.card-container {
  width: 30%;
  height: 100vh;
  background-color: #a3bac3;
  border-radius: 0px;
  padding: 10px;
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
  text-shadow: 3px 3px 8px #01a7c2;
}
.site-container {
  margin: 0px;
  padding: 0px;
}
.component-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
}

@media screen and (max-width: 820px) {
  .logo {
    font-size: 4em;
  }
  .logo-container {
    height: 40%;
    align-items: center;
  }
  .card-container {
    width: 90%;
    height: 60%;
    margin-top: -20%;
    border-radius: 20px;
  }
  .component-flex {
    flex-direction: column;
    align-items: center;
  }
}
</style>
