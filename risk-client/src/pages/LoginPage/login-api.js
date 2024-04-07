import ApiClient from "../../api-common/apiClient.js";

export function createTokenFromApi(loginDto){
    return ApiClient.post(`/Auth/login`, loginDto)
}