<template>
  <div id="app">
    <img alt="Dashboard logo" src="./assets/statistics-report.png" class="logo">
    <!-- Conditionally render LoginForm or Dashboard component based on authentication -->
    <template v-if="isLoggedIn">
      <Dashboard />
    </template>
    <template v-else>
      <LoginForm @loginSuccess="handleLogin" />
    </template>
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue';
import Dashboard from './components/Dashboard.vue';

export default {
  name: 'App',
  components: {
    LoginForm,
    Dashboard
  },
  data() {
    return {
      isLoggedIn: false
    };
  },
  methods: {
    handleLogin() {
      this.isLoggedIn = true;
    }
  }
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/* Adjusted size of the logo */
.logo {
  width: 300px;
  /* Adjust the width as needed */
  height: auto;
  /* Maintain aspect ratio */
}
</style>
