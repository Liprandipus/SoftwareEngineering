import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '../components/WelcomePage.vue'
import AppointmentPage from '../components/AppointmentPage.vue'
import RegisterPage from '../components/RegisterPage.vue'

const routes = [
    {
        path: '/',  // Home page
        name: 'WelcomePage',
        component: WelcomePage
    },
    {
        path: '/appointment',  // route for appointment page
        name: 'Appointment',
        component: AppointmentPage
    },
    {
        path:  '/appointment/register',
        name : 'Register',
        component: RegisterPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
