// Import styles
import './assets/style.css';

// General imports
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import { sessionTimeoutMixin } from './sessionTimeoutMixin';

// Create the app
const app = createApp(App);

// Utilize the router
app.use(router);


// Mount the app
app.mount('#app');
