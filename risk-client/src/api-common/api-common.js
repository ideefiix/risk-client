import axiosClient from "./apiClient.js";

export function fetchPlayerFromAPI(playerId){
    return axiosClient.get(`/player/${playerId}`)
}

export function fetchTerritoriesFromAPI(){
    return axiosClient.get(`/territory`)
}