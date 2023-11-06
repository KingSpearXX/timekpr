import {createApp} from 'vue';
import {createPinia} from 'pinia';
import {firebaseApp} from './services/Firebase.js';

import VueTheMask from 'vue-the-mask';
import App from './App.vue';

import router from './router/Router.js';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

await firebaseApp();

app.use(VueTheMask);
app.use(router);
app.mount('#app');
