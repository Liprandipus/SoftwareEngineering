<template>
  <div class="appointment-form" style="text-align: center;">
    <h1><b>Appointment Page</b></h1>
    <img src="../assets/inside.png" style="width: 500px; height: 300px;">
    <p>Book your visit here,  {{username }}</p>

    <div class="form-group">
      <label for="service">Service: </label>
      <select id="service" v-model="selectedService">
        <option disabled value="">Select Service:</option>
        <option v-for="service in services" :key="service" :value="service">
          {{ service }}
        </option>
      </select>
    </div>
    <br>
    <div class="form-group">
      <label for="date">Date: </label>
      <input type="date" id="date" v-model="selectedDate" :min="minDate" :max="maxDate"/>
    </div>
    <br>
    <div class="form-group">
      <label for="time">Time: </label>
      <select id="time" v-model="selectedTime">
        <option disabled value="">Select Hour</option>
        <option v-for="time in availableTimes" :key="time" :value="time">
          {{ time }}
        </option>
      </select>
    </div>
    <br>
    <div class="form-group">
      <label for="barber">Barber: </label>
      <select id="barber" v-model="selectedBarber">
        <option disabled value="">Select Barber:</option>
        <option v-for="barber in barbers" :key="barber" :value="barber">
          {{ barber }}
        </option>
      </select>
    </div>
    <br>
    <button @click="submitForm" class="submit-button">Book</button>

    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    <p v-if="successMessage" style="color: green;">{{ successMessage }}</p>

    <br><br>
    <router-link to="/welcome">Back to Homepage</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userEmail:'',
      services: ["Haircut - 15€", "Shaving - 5€", "Hair dyeing - 8€"],
      selectedService: "",

      selectedDate: "",
      minDate: new Date().toISOString().split("T")[0],
      maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],

      selectedTime: "",
      availableTimes: [],

      barbers: ["John", "Nasia", "Jim", "Mary"],
      selectedBarber: "",

      errorMessage: '',
      successMessage: '',

    };
  },
  created(){
    this.userEmail = localStorage.getItem('userEmail') || '';
    this.username = this.userEmail.split('@')[0];
  },
  watch: {
    selectedDate() {
      this.generateAvailableTimes();
    },
  },
  methods: {
    generateAvailableTimes() {
      const startTime = 9;
      const endTime = 21;
      const interval = 30;

      this.availableTimes = [];
      for (let hour = startTime; hour < endTime; hour++) {
        for (let minute = 0; minute < 60; minute += interval) {
          const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
          this.availableTimes.push(time);
        }
      }
    },

    async submitForm() {
      if (!this.selectedService || !this.selectedDate || !this.selectedTime || !this.selectedBarber) {
        this.errorMessage = "Please fill in all the fields!";
        return;
      }

      try {

        const userEmail = localStorage.getItem('userEmail');

        if (!userEmail) {
          this.errorMessage = 'User not logged in.';
          return;
        }

        const response = await fetch('http://localhost:3000/api/auth/appointment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service: this.selectedService,
            date: this.selectedDate,
            time: this.selectedTime,
            barber: this.selectedBarber,
            email: userEmail
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Booking failed');
        }

        this.successMessage = data.message;
        this.errorMessage = '';

        setTimeout(() => {
          window.location.href = 'http://localhost:8080/welcome';
        }, 1500);

      } catch (error) {
        this.errorMessage = error.message;
        this.successMessage = '';
      }
    }
  }
};
</script>
