import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Dropdown from 'primevue/dropdown';
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true });
    nuxtApp.vueApp.component("Dropdown", Dropdown);
    //other components that you need
});