import ApiClient from "../../api-common/apiClient.js";

export function purchaseBuildingWithApi(buildingId){
    return ApiClient.post(`/Building/${buildingId}`)
}