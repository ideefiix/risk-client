import ApiClient from "../../api-common/apiClient.js";

export function createTokenFromApi(loginDto){
    return ApiClient.post(`/Auth/login`, loginDto)
}

export function registerPlayerWithApi(registerDto){
    return ApiClient.post(`/Player`, registerDto)
}