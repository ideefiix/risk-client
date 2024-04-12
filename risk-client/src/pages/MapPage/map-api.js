import ApiClient from "../../api-common/apiClient.js";

export function attackTerritoryWithApi(attackDto){
    return ApiClient.post(`/Territory/attack/${attackDto.territoryId}`, attackDto)
}

export function reinforceTerritoryWithApi(reinforceDto){
    //TODO
    return ApiClient.post(`/Territory/reinforce/${reinforceDto.territoryId}`, reinforceDto)
}