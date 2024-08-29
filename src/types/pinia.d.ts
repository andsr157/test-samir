import { AxiosInstance } from 'axios'
import { PiniaCustomProperties } from 'pinia'

declare module 'pinia' {
    export interface PiniaCustomProperties {
        $axios: AxiosInstance
    }
}