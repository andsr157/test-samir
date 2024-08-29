// src/plugins/axiosPlugin.ts
import axios, { type AxiosInstance } from 'axios'
import { type App, inject } from 'vue'

const axiosKey = Symbol('axios')

export const createAxiosPlugin = (baseURL: string) => {
    const axiosInstance: AxiosInstance = axios.create({
        baseURL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const axiosPlugin = {
        install(app: App) {
            app.provide(axiosKey, axiosInstance)
        },
    }

    return {
        axiosInstance, // expose axiosInstance
        axiosPlugin,
    }
}

export const useAxios = () => {
    const axios = inject<AxiosInstance>(axiosKey)
    if (!axios) {
        throw new Error('Axios instance not provided')
    }
    return axios
}
