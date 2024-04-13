﻿import {Card} from "react-bootstrap";
import {useEffect, useState} from "react";
import Spinner from "react-bootstrap/Spinner";

const BuildingCard = ({building, buyBuildingCallback, player, parentApiLoading}) => {
    const [loadingApi, setLoadingApi] = useState(false)
    const [showError, setShowError] = useState(false)

    useEffect(() => {
        //Building purchase complete
        if (parentApiLoading === false && loadingApi === true) {
            setLoadingApi(false)
        }
    }, [parentApiLoading])

    function buyBuildingHandler() {
        if (building.cost > player.cash) {
            setShowError(true)
        } else {
            //Player can afford it
            setLoadingApi(true)
            buyBuildingCallback(building.id)
        }
    }

    return (
        <Card style={{width: '150px', padding: '0', textAlign: "center"}}>
            <Card.Body>
                <Card.Title>{building.name}</Card.Title>
                <Card.Text>
                    Yield: <span style={{color: "var(--green_darker)"}}>{building.income}</span>
                </Card.Text>
                {showError && <p className={"buildingCard__error"}>You're broke</p>}
                {loadingApi
                    ?
                    <Spinner/>
                    :
                    <button className={"button__green "} onClick={() => buyBuildingHandler()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-cash-coin me-1" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"/>
                            <path
                                d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z"/>
                            <path
                                d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z"/>
                            <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567"/>
                        </svg>
                        {building.cost}
                    </button>
                }

            </Card.Body>
        </Card>
    )
}

export default BuildingCard