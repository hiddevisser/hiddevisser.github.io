// main.js
import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router'; // Import createRouter and createWebHistory
import router from './router.js'; // Import the router instance from router.js

// We are using createRouter and createWebHistory indirectly when creating the router instance
/* eslint-disable no-unused-vars */
const routerInstance = createRouter({
  history: createWebHistory(),
  routes: router.options.routes, // This is an internal property, you may need to adjust it based on your router setup
});
/* eslint-enable no-unused-vars */

// Create the root Vue instance using createApp
const app = createApp(App);

// Install the router plugin
app.use(router);

// Mount the Vue instance to the DOM element with id 'app'
app.mount('#app');
