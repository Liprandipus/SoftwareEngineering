<template>
  <div style="text-align: center;">
    <h1>Welcome to Lupi's Barbershop, {{username }}</h1>
    <p>Book your appointment right now!</p>

    <!-- image from /assets -->
    <img src="../assets/logo.png" style="width: 700px; height: 500px;">

    <h3>Click to book:</h3>
    <!-- router link to go to appointment page-->
    <router-link to="/appointment">Book Appointment</router-link>
    <br><br>
    <h3>Go back to Login Page:</h3>
    <router-link to="/">Login</router-link>
  </div>
</template>

<script>
export default {
  name: 'WelcomePage',
  data() {
    return {
      userEmail: ''
    };
  },
  created() {

    this.userEmail = localStorage.getItem('userEmail') || '';
    this.username = this.userEmail.split('@')[0];
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
