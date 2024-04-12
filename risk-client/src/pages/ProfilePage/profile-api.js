import ApiClient from "../../api-common/apiClient.js";

export function rollColorFromApi(playerId){
    return ApiClient.put(`/Player/color/${playerId}`)
}