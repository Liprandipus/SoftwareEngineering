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

    <p><b>Continue as guest:</b></p>
    <router-link to="/Welcome">
      <button class="btn btn-primary">Guest</button>
    </router-link>

    <p><b>Don't have an account? </b></p>
    <router-link to="/Register">
      <button class="btn btn-primary">Register</button>
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
    submitForm() {
      // Correct email validation regex pattern:
      // ( [^\s@]+ = username, @, \., [^\s@]+ = at least one valid character,  $ = end)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!this.email || !this.password) {
        this.errorMessage = 'Email and Password are both required.';
      } else if (!emailPattern.test(this.email)) {
        this.errorMessage = 'Enter a valid email address.';
      } else {
        this.errorMessage = '';
        alert('Login has been successful!'); // Replace with actual login logic

        // Redirect using Vue Router
        this.$router.push('/Welcome');
      }
    }
  }
};
</script>

<style>
h2 {
  font-family: 'Poppins', sans-serif;
  font-size: 28px;
  text-transform: capitalize;
}
</style>
