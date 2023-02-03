import axios from 'axios';
import { writable } from 'svelte/store';
import { toastStore } from '@skeletonlabs/skeleton';
import { push } from 'svelte-spa-router';
export const user = writable(null)

export const poops = writable([])
export const poopTypes = writable([])
export const supplements = writable([])
export const todaysSupplements = writable([])
export const medicine = writable([])
export const todaysMedicine = writable([])

axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT
axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error.response.status === 401) {
        user.set(null)
        localStorage.removeItem('user')
        push('/login')
    }
    return Promise.reject(error);
  });

export const api = {
    medicine: {
        all: async () => {
            const medicines = await axios.get('/medicine')
            medicine.set(medicines.data)
        },
        add: async (medicine) => {
            const request = await axios.post('/medicine', medicine)
            // Update store
            // medicine.set($medicine.push(request.data))
        },
        update: async (medicine) => {
            const request = await axios.put('/medicine/' + medicine.id, medicine)
        },
        delete: async (medicine) => {
            const request = await axios.delete('/medicine', medicine.id)
        },
        today: async () => {
            const request = await axios.get('/medicine/today')
            todaysMedicine.set(request.data)
        },
        take: async (medicine) => {
            const request = await axios.post('/medicine/registerMedicine', medicine)
            return request.data
        },
        untake: async (medicine) => {
            const request = await axios.put('/medicine/registerMedicine/' + medicine.id, {
                checked: medicine.checked
            })
        }
    },
    stool: {
        types: async () => {
            const request = await axios.get('/stool/types')
            poopTypes.set(request.data)
        },
        history: async () => {
            const request = await axios.get('/stool/history')
            poops.set(request.data)
        },
        register: async (stool) => {
            const request = await axios.post('/stool/registerStool', stool)
        }
    },
    user: {
        login: async (data) => {
            const request = await axios.post('/user/login', data)
            if (request.data.token) {
                const usr = request.data.user
                usr.token = request.data.token
                window.localStorage.setItem('user', JSON.stringify(usr))
                user.set(usr)
                axios.defaults.headers.common['Authorization'] = `Bearer ${usr.token}`;
            }
            return request.data
        },
        renew: async () => {
            const stored = localStorage.getItem('user')
            if (stored) {
                await axios.post('/user/renew', JSON.parse(stored)).then((response) => {
                    window.localStorage.setItem('user', JSON.stringify(response.data))
                    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                    user.set(response.data)
                    return true
                })
            } else {
                throw new Error('Not logged in')
            }
            
        }
    }
}