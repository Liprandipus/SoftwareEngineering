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
      errorMessage: '',
      successMessage: ''
      
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
          const response = await fetch('http://localhost:3000/api/auth/register', {
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
          console.log('Server response:', data);

          if (response.ok) {
            this.successMessage = 'Registration successful!';
            this.errorMessage = '';

            setTimeout(() => {
              this.$router.push('/');
            }, 2000);
          } else {
            this.errorMessage = data.message || 'Registration failed';
            this.successMessage = '';
          }
        } catch (error) {
          console.error('Error during registration:', error);
          this.errorMessage = 'An error occurred during registration';
          this.successMessage = '';
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
