import { createApp } from 'vue';
import { store, key } from './store';

// root component
import App from './App.vue';
// tailwind styles
import './styles/app.css';

const app = createApp(App);
app.use(store, key);

// icons... this is wordy but it works
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faStar,
  faTrash,
  faPlusCircle,
  faTag,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faStar, faTrash, faPlusCircle, faTag);
app.component('FontAwesomeIcon', FontAwesomeIcon);

// mount ye ole smail app
app.mount('#app');
