import { useAuthStore } from "~/store/auth"

export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore();
    if(!auth.isAuthenticated){
        return navigateTo('/auth/login')
    }

    return
})
