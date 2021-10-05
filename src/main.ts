import { createApp } from 'vue';
// vuex
import { store, key } from './store';
// root component
import App from './App.vue';
// toaster plugin
// @ts-ignore
import Toaster from '@meforma/vue-toaster';
// tailwind styles
import './styles/app.css';

const app = createApp(App);

// icons... this is wordy but it works
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faStar,
  faStarHalf,
  faTrash,
  faPlusCircle,
  faTag,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faStar, faStarHalf, faTrash, faPlusCircle, faTag);

// install plugins & icons
app.use(store, key);
app
  .use(Toaster, { position: 'bottom-left' })
  .provide('toast', app.config.globalProperties.$toast);
app.component('FontAwesomeIcon', FontAwesomeIcon);

// mount ye ole smail app
app.mount('#app');
