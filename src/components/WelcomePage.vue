<template>
  <div style="text-align: center;">
    <h1>Welcome to Lupi's Barbershop</h1>
    <p>Book your appointment right now!</p>

    <!-- image from /assets -->
    <img src="../assets/logo.png" style="width: 700px; height: 500px;">

    <h3>Click to book:</h3>
    <!-- router link to go to appointment page-->
    <router-link to="/Appointment">Book Appointment</router-link>
    <br><br>
    <h3>Go back to Login Page:</h3>
    <router-link to="/">Login</router-link>
  </div>
</template>

<script>
export default {
  name: 'WelcomePage',
  props: {
    msg: String
  }
}
</script>

<style>
h2 {
  font-family: 'Poppins', sans-serif;
  font-size: 28px;
  text-transform: capitalize;
}
</style>

