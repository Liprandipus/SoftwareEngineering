<template>
  <div style="text-align: center;">
    <h1><b>Appointment Page</b></h1>
    <p>Book your visit here!</p>

 <form class="custom-container">
    <div class="mb-3">
      <p><b>Already a member? </b></p>
      <label for="exampleInputEmail1" class="form-label">Email address  </label> 
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    </div>



    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password </label>
      <input type="password" class="form-control" id="exampleInputPassword1">
    </div>
  <button type="submit" class="btn btn-primary">Submit</button>


</form>

<form class = "center-container">
  <div class ="mb-3">
  <p><b>Don't have an account ? </b></p>
  <router-link to="/Appointment/Register" custom v-slot="{ navigate }">
  <button @click="navigate" class="btn btn-primary">
    Register
  </button>
</router-link>
  </div>
</form>


<form class = "right-container">
  <div class ="mb-3"> 
    <p><b>Continue as guest</b></p>
    <router-link to="/Appointment/Book" custom v-slot="{ navigate }">
  <button @click="navigate" class="btn btn-primary">
    Guest
  </button>
</router-link>
</div>
</form>


<router-link to="/">Back to Homepage</router-link> 
  </div>
</template>

<script>
export default {
  name: 'AppointmentPage'  // Needs to be two words
};

</script>

<style scoped>
h2 {
  font-family: Calibri;
  color: #4CAF50;
}
.custom-container{
  margin-left: 300px;
  text-align: left;
}

.center-container{
  margin-top : -115px;
  text-align : top;
  margin-left : -350px;
}

.right-container{
  margin-right : 800px;
  text-align : right;
  margin-top : -70px;
  
}
</style>
