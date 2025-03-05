<template>
  <div style="text-align: center;">
    <h1>Login</h1>
    <img src="../assets/barberShop.png" style="width: 300px; height: 300px;">
    <br><br>
    <b>Already a member? Sign in: </b>
    <br><br>
    <label for="InputEmail" class="form-label">Email </label>
    <input type="email" class="form-control" id="InputEmail" v-model="email">
    <br>
    <label for="InputPassword" class="form-label">Password </label>
    <input type="password" class="form-control" id="InputPassword" v-model="password">
    <br><br>
    <button type="submit" class="btn btn-primary" @click="submitForm">Submit</button>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    <br><br>
    <b>Don't have an account? </b>
    <br><br>
    <router-link to="/register">
      <button class="btn btn-primary">Register</button>
    </router-link>
    <br><br>Or<br><br>
    <b>Continue as guest:</b>
    <br><br>
    <router-link to="/welcome">
      <button class="btn btn-primary">Guest</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async submitForm() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!this.email || !this.password) {
        this.errorMessage = 'Email and Password are both required.';
      } else if (!emailPattern.test(this.email)) {
        this.errorMessage = 'Enter a valid email address.';
      } else {
        this.errorMessage = '';

        try {
          const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password,
            }),
          });

          const data = await response.json();

          if (response.ok) {
            
            localStorage.setItem('userEmail', this.email);

           
            this.$router.push('/welcome');
          } else {
            
            this.errorMessage = data.message || 'Login failed';
          }
        } catch (error) {
          console.error('Error during login:', error);
          this.errorMessage = 'An error occurred during login';
        }
      }
    }
  }
};
</script>

<style>
h2 {
  font-family: 'Carlito', sans-serif;
  font-size: 28px;
  text-transform: capitalize;
}
</style>
