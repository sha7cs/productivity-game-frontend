import axios from "axios"
import { jwtDecode } from "jwt-decode"

export function saveTokens(access, refresh){
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)
}

export function getUserFromToken(){
    const token = localStorage.getItem('access_token')
    return token? jwtDecode(token) : null
}