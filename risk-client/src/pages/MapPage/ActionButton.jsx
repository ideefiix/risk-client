import "./MapPage.css"
import {useEffect, useState} from "react";
import {attackTerritoryWithApi} from "./map-api.js";
import {useAuth} from "../../auth/AuthProvider.jsx";

const ActionButton = ({attackTerritory, reinforceTerritory, troops, setTroops}) => {
    const [reinforcePressed, setReinforcePressed] = useState(false)
    const [attackPressed, setAttackPressed] = useState(false)
   
    
    function attackBtnHandler(){
        if(attackPressed){
            if(troops === "" || troops === "0") {setAttackPressed(false)}
            else{
                attackTerritory()
            }
            
        }else{
            setAttackPressed(true)
        }
    }
    function reinforceBtnHandler(){
        if(reinforcePressed){
            if(troops === "" || troops === "0") {setReinforcePressed(false)}
            else{
                reinforceTerritory()
            }
        }else{
            setReinforcePressed(true)
        }
    }
    
    function setTroopsHandler(value){
        if(value === "") setTroops(value)
        if(/^\d+$/.test(value)){
            setTroops(value)
        }
    }
    
    return (
        <div className={"actionBtn__container"}>
            {!attackPressed &&
                <div className={"actionBtn__reinforce"} onClick={reinforceBtnHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                         className="bi bi-shield" viewBox="0 0 16 16">
                        <path
                            d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56"/>
                    </svg>
                </div>
            }
            
            {(reinforcePressed || attackPressed) &&
                <input className={"actionBtn__input scale-in-right"} type="text" value={troops} onChange={e => setTroopsHandler(e.target.value)}/>}

            {!reinforcePressed &&
                <div className={"actionBtn__attack"} onClick={attackBtnHandler}>
                    <svg fill="#000000" height="20px" width="20px" version="1.1" id="Capa_1"
                         xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                         viewBox="0 0 57 57" xmlSpace="preserve">
                    <path d="M57,0h-8.837L18.171,29.992l-4.076-4.076l-1.345-4.034c-0.22-0.663-0.857-1.065-1.55-0.98
                    c-0.693,0.085-1.214,0.63-1.268,1.327l-0.572,7.438l5.982,5.982L4.992,46H2.274C1.02,46,0,47.02,0,48.274v6.452
                    C0,55.98,1.02,57,2.274,57h6.452C9.98,57,11,55.98,11,54.726v-3.421l10-10l6.021,6.021l6.866-1.145
                    c0.685-0.113,1.182-0.677,1.21-1.37c0.028-0.693-0.422-1.295-1.096-1.464l-3.297-0.824l-4.043-4.043L57,8.489V0z M9,54.726
                    C9,54.877,8.877,55,8.726,55H2.274C2.123,55,2,54.877,2,54.726v-6.452C2,48.123,2.123,48,2.274,48h0.718h5.734
                    C8.877,48,9,48.123,9,48.274v5.031V54.726z M11,48.477v-0.203C11,47.02,9.98,46,8.726,46H7.82l8.938-8.938l1.417,1.417l1.411,1.411
                    L11,48.477z M30.942,44.645l-3.235,0.54l-5.293-5.293l0,0l-2.833-2.833l-8.155-8.155l0.292-3.796l0.63,1.89l4.41,4.41l0,0
                    l4.225,4.225l8.699,8.699L30.942,44.645z M25.247,37.066l-2.822-2.822l-2.839-2.839L48.991,2h4.243L23.829,31.406
                    c-0.391,0.391-0.391,1.023,0,1.414c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293L55,3.062v4.592L25.247,37.066z"/>
                </svg>
                </div>
            }
        </div>
    )
}

export default ActionButton