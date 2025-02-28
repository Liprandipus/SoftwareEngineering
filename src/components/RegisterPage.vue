<template>
  <div style="text-align: center;">
    <h1>Register Form</h1>
    <img src="../assets/account.png" style="width: 100px; height: 100px;">
    <br><br>
    <b>Create account: </b>
    <br><br>
    <label for="InputEmail" class="form-label">Email </label>
    <input type="email" class="form-control" id="InputEmail" v-model="email">
    <br>
    <label for="InputPassword" class="form-label">Password </label>
    <input type="password" class="form-control" id="InputPassword" v-model="password">
    <br><br>
    <button type="submit" class="btn btn-primary" @click="submitForm">Submit</button>
    <br><br>
    <p><b>Back to login:</b></p>
    <router-link to="/">
      <button class="btn btn-primary">Login</button>
    </router-link>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    <p v-if="successMessage" style="color: green;">{{ successMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
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
  font-family: 'Carlito', sans-serif;
  font-size: 28px;
  text-transform: capitalize;
}
</style>
