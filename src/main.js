// Import styles
import './assets/style.css';

// General imports
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// Create the app
const app = createApp(App);

// Declare toast options
const toastOptions = {
    timeout: 5000,
    position: 'top-center',
    hideProgressBar: false,
  };

// Utilize the router
app.use(router);

// Utilize Vue Toasts and their options
app.use(Toast, toastOptions);

// Mount the app
app.mount('#app');
