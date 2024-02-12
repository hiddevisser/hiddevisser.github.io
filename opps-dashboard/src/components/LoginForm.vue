<template>
    <div class="container">
        <h1>Login</h1>
        <form class="login-form" @submit.prevent="login">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" class="form-control" placeholder="Enter your username"
                    v-model="username">
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" class="form-control" placeholder="Enter your password"
                    v-model="password">
            </div>
            <button type="submit" class="btn btn-primary btn-block">Login</button>
            <!-- Error message section -->
            <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            password: '',
            errorMessage: '',
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://localhost:3000/login', {
                    username: this.username,
                    password: this.password
                });

                if (response && response.data && response.data.success) {
                    this.$emit('loginSuccess'); // Emit event indicating successful login
                } else if (response && response.data && response.data.message) {
                    this.errorMessage = response.data.message; // Display error message
                } else {
                    this.errorMessage = 'Unknown error occurred';
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    this.errorMessage = error.response.data.message;
                } else {
                    this.errorMessage = 'Network error occurred' + error;
                }
            }
        }
    }
};
</script>

  
<style scoped>
/* Styles specific to this component */
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
}

.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

.login-form {
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    font-weight: bold;
}

input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.error-message {
    color: #ff0000;
    margin-top: 10px;
}

.signup-link,
.forgot-password-link {
    text-align: center;
}

.signup-link a,
.forgot-password-link a {
    color: #007bff;
    text-decoration: none;
}

.signup-link a:hover,
.forgot-password-link a:hover {
    text-decoration: underline;
}
</style>
  