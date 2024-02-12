// router.js
import { createWebHistory, createRouter } from 'vue-router';
import LoginForm from './components/LoginForm.vue'; // Import LoginForm component
import Dashboard from './components/Dashboard.vue'; // Import Dashboard component

const routes = [
  {
    path: '/',
    name: 'LoginForm', // Name the route 'LoginForm'
    component: LoginForm, // Set LoginForm as the component for the root path
  },
  {
    path: '/dashboard',
    name: 'Dashboard', // Name the route 'Dashboard'
    component: Dashboard,
    meta: { requiresAuth: true } // Optionally, you can add meta data to require authentication
  },
  // Add any additional routes for your application
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
