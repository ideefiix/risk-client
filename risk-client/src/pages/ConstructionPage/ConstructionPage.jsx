import Container from "react-bootstrap/Container";
import {Row} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import BuildingCard from "./BuildingCard.jsx";
import {purchaseBuildingWithApi} from "./construction-api.js";
import "./ShopPage.css"

const ConstructionPage = ({player, setPlayer}) => {
    const mounted = useRef(false)
    const [loadingApi, setLoadingApi] = useState(false)
    const [cashBuildings, setCashBuildings] = useState(null)
    const [armyBuildings, setArmyBuildings] = useState(null)

    useEffect(() => {
        if (!mounted.current) {
            fetchBuildings()
            mounted.current = true
        }
    }, [])

    function fetchBuildings() {
        //Fetch real data in future and cache response.
        const cashRes = [{
            "id": 1,
            "name": "Bank",
            "cost": 100,
            "income": 10,
            "type": 0
        }]
        const armyRes = [{
            "id": 2,
            "name": "Barrack",
            "cost": 100,
            "income": 10,
            "type": 1
        }]

        setCashBuildings(cashRes)
        setArmyBuildings(armyRes)
    }

    function buyBuilding(buildingId) {
        setLoadingApi(true)

        purchaseBuildingWithApi(buildingId).then(res => {
            setPlayer(res.data)
        }, rej => {
            //Do something with error.
        }).finally(() => {
            setLoadingApi(false)
        })

    }

    return (
        <Container className={"pt-1"}>
            <p>Yield is granted every 5min</p>
            <Row className={"mt-2"}>
                <h5>Cash Building</h5>
                {
                    cashBuildings && cashBuildings.map(cb => {
                        return <BuildingCard key={cb.id} player={player} parentApiLoading={loadingApi} building={cb}
                                             buyBuildingCallback={buyBuilding}/>
                    })
                }
            </Row>
            <Row className={"mt-3"}>
                <h5>Troop Building</h5>
                {
                    armyBuildings && armyBuildings.map(ab => {
                        return <BuildingCard key={ab.id} player={player} parentApiLoading={loadingApi} building={ab}
                                             buyBuildingCallback={buyBuilding}/>
                    })
                }
            </Row>
        </Container>
    )
}

export default ConstructionPage