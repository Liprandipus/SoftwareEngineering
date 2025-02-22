<template>
    <div class="appointment-form">
      <h1>Κλείστε Ραντεβού</h1>
  
      <!-- Επιλογή Παροχής -->
      <div class="form-group">
        <label for="service">Παροχή:</label>
        <select id="service" v-model="selectedService">
          <option disabled value="">Επιλέξτε μια παροχή</option>
          <option v-for="service in services" :key="service" :value="service">
            {{ service }}
          </option>
        </select>
      </div>
  
      <!-- Επιλογή Ημερομηνίας -->
      <div class="form-group">
        <label for="date">Ημερομηνία:</label>
        <input type="date" id="date" v-model="selectedDate" :min="minDate" :max="maxDate" />
      </div>
  
      <!-- Επιλογή Ώρας -->
      <div class="form-group">
        <label for="time">Ώρα:</label>
        <select id="time" v-model="selectedTime">
          <option disabled value="">Επιλέξτε ώρα</option>
          <option v-for="time in availableTimes" :key="time" :value="time">
            {{ time }}
          </option>
        </select>
      </div>
  
      <!-- Επιλογή Κουρέα -->
      <div class="form-group">
        <label for="barber">Κουρέας:</label>
        <select id="barber" v-model="selectedBarber">
          <option disabled value="">Επιλέξτε κουρέα</option>
          <option v-for="barber in barbers" :key="barber" :value="barber">
            {{ barber }}
          </option>
        </select>
      </div>
  
      <!-- Κουμπί Υποβολής -->
      <button @click="submitForm" class="submit-button">Κλείστε Ραντεβού</button>
  
      <!-- Εμφάνιση των Επιλογών -->
      <div v-if="submitted" class="confirmation">
        <h2>Επιβεβαίωση Ραντεβού</h2>
        <p><strong>Παροχή:</strong> {{ selectedService }}</p>
        <p><strong>Ημερομηνία:</strong> {{ selectedDate }}</p>
        <p><strong>Ώρα:</strong> {{ selectedTime }}</p>
        <p><strong>Κουρέας:</strong> {{ selectedBarber }}</p>
      </div>
    </div>
  </template>


<script>
export default {
  data() {
    return {
      // Διαθέσιμες Παροχές
      services: ["Κούρεμα", "Ξύρισμα", "Πλύσιμο", "Βάψιμο"],
      selectedService: "", // Επιλεγμένη Παροχή

      // Ημερομηνία
      selectedDate: "", // Επιλεγμένη Ημερομηνία
      minDate: new Date().toISOString().split("T")[0], // Σημερινή ημερομηνία
      maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split("T")[0], // Μέχρι 1 χρόνο από σήμερα

      // Ώρα
      selectedTime: "", // Επιλεγμένη Ώρα
      availableTimes: [], // Διαθέσιμες Ώρες

      // Διαθέσιμοι Κουρείς
      barbers: ["Γιάννης", "Μαρία", "Κώστας", "Ελένη"],
      selectedBarber: "", // Επιλεγμένος Κουρέας

      // Κατάσταση Υποβολής
      submitted: false,
    };
  },
  watch: {
    // Όταν αλλάζει η ημερομηνία, ενημερώνονται οι διαθέσιμες ώρες
    selectedDate() {
      this.generateAvailableTimes();
    },
  },
  methods: {
    // Δημιουργία διαθέσιμων ωρών
    generateAvailableTimes() {
      const startTime = 9; // 9:00 π.μ.
      const endTime = 21; // 9:00 μ.μ.
      const interval = 30; // Κάθε 30 λεπτά

      this.availableTimes = [];
      for (let hour = startTime; hour < endTime; hour++) {
        for (let minute = 0; minute < 60; minute += interval) {
          const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
          this.availableTimes.push(time);
        }
      }
    },

    // Υποβολή Φόρμας
    submitForm() {
      if (
        this.selectedService &&
        this.selectedDate &&
        this.selectedTime &&
        this.selectedBarber
      ) {
        this.submitted = true; // Εμφάνιση επιβεβαίωσης
      } else {
        alert("Παρακαλώ συμπληρώστε όλα τα πεδία!");
      }
    },
  },
};
</script>



<style>

h2 {
  font-family: Calibri;
  color: #4CAF50;
}

</style>