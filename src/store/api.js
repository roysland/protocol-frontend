import axios from 'axios';
import { writable } from 'svelte/store';
import { toastStore } from '@skeletonlabs/skeleton';
import { push } from 'svelte-spa-router';
export const user = writable(null)
export const periods = writable([])
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
    user: {
        register: async (user) => {
            const req = await axios.post('/register', user).then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data.user))
                user.set(response.data.user)
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
            }).catch((e) => {
                toastStore.trigger({
                    message: 'Noe gikk galt.',
                    preset: 'error'
                })
            })
            return req
        },
        logout: async () => {
            user.set(null)
            localStorage.removeItem('user')
            push('/login')
        },
        login: async (user) => {
            return await axios.post('/login', user)
        },
        refreshToken: async () => {
            const storedUser = JSON.parse(localStorage.getItem('user'))
            if (storedUser) {
                const req = await axios.get('/verify/' + storedUser.token).then((response) => {
                    storedUser.token = response.data.renewed
                    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.renewed}`
                })
                localStorage.setItem('user', JSON.stringify(storedUser))
                user.set(storedUser)
            }
            
        }
    },
    medicine: {
        addMedicine: async (medicine) => {
            axios.post('/medicine', medicine).then(async (response) => {
                await api.medicine.allMedicine()
            })
        },
        deleteMedicine: async (array) => {
            axios.post('/medicine/delete', { items: array}).then(async () => {
                await api.medicine.allMedicine()
                await api.medicine.todaysMedicine()
            })
        },
        allMedicine: async () => {
            axios.get('/medicine/all').then((response) => {
                medicine.set(response.data.medicine)
            })
        },
        todaysMedicine: async () => {
            axios.get('/medicine/today').then((response) => {
                todaysMedicine.set(response.data.today)
            })
        },
        checkMed: async (med) => {
            axios.post('/medicine/check', med).then((response) => {
                console.log(response.data)
            })
        }
    },
    stool: {
        getTypes: async () => {
            axios.get('/stool/types').then((response) => {
                poopTypes.set(response.data.stoolTypes)
            })
        },
        getMyPoops: async () => {
            axios.get('/stool/stools').then((response) => {
                poops.set(response.data.stools)
            })
        },
        registerPoop: async (stoolId) => {
            axios.post('/stool', {
                stoolId: stoolId
            }).then(async () => {
                await api.stool.getMyPoops()
            })
            
        }
    },
    periods: {
        getMyPeriods: async () => {
            axios.get('/period').then((response) => {
                periods.set(response.data.periods)
            })
        },
        registerPeriod: async (startDate) => {
            axios.post('/period', { createdAt: startDate}).then((response) => {
                api.periods.getMyPeriods()
            })
        },
        registerSymptom: async () => {
            // axios.post('/period')
        }
    },
    supplements: {
        addSupplement: async (supplement) => {
            axios.post('/supplements', supplement).then(() => {
                api.supplements.getAllSupplements()
            })
        },
        getAllSupplements: async () => {
            axios.get('/supplements').then(async (response) => {
                supplements.set(response.data.supplements)
                await api.supplements.getTodays()
            })
        },
        getTodaysSupplements: async () => {
            axios.get('/supplements/today').then(() => {

            })
        },
        deleteSupplements: async (array) => {
            axios.post('/supplements/delete', { items: array}).then(() => {
                api.supplements.getAllSupplements()
            })
        },
        markDailyCheck: async (sup) => {
            axios.post('/supplements/check', sup).then((data) => {
                api.supplements.getAllSupplements()
            })
        },
        getTodays: async () => {
            axios.get('/supplements/today').then((data) => {
                todaysSupplements.set(data.data.today)
            })
        }
    }
}