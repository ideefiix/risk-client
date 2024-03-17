import Container from "react-bootstrap/Container";
import {Row} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import BuildingCard from "./BuildingCard.jsx";

const ShopPage = () => {
    const mounted = useRef(false)
    const [cashBuildings, setCashBuildings] = useState(null)
    const [armyBuildings, setArmyBuildings] = useState(null)
    
    useEffect(() => {
        if(!mounted.current){
            fetchBuildings()
            mounted.current = true
        }
    }, [])
    
    function fetchBuildings(){
        const cashRes = [{
            "name": "Bank",
            "cost": 100,
            "produce": 10,
            "type": "cash"
        }]
        const armyRes = [{
            "name": "Barrack",
            "cost": 100,
            "produce": 10,
            "type": "troop"
        }]
        
        setCashBuildings(cashRes)
        setArmyBuildings(armyRes)
    }
    
    function buyBuilding(building){
        console.log("Building bought")
    }
    
    return (
        <Container>
            <Row className={"mt-2"}>
                <h5>Cash Building</h5>
                {
                    cashBuildings && cashBuildings.map(cb => {
                        return <BuildingCard building={cb} buyBuildingCallback={buyBuilding}/>
                    })
                }
            </Row>
            <Row className={"mt-3"}>
                <h5>Troop Building</h5>
                {
                    armyBuildings && armyBuildings.map(ab => {
                        return <BuildingCard building={ab} buyBuildingCallback={buyBuilding} />
                    })
                }
            </Row>
        </Container>
    )
}

export default ShopPage