<template>
  <div style="text-align: center;">
    <h1>Welcome to Lupi's Barbershop</h1>
    <p>Book your appointment right now!</p>

    <!-- image from /assets -->
    <img alt="Vue logo" src="../assets/logo.png" style="width: 700px; height: 500px;">

    <h3><b>Click Below:</b></h3>
    <ul>
        <!-- router link to go to appointment page-->
        <router-link to="/Appointment">Book Appointment</router-link>
    </ul>
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
  font-family: Calibri;
  color: #4CAF50;
}
</style>
