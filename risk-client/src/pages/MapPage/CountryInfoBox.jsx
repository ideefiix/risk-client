import "./MapPage.css"
import {Col, Row} from "react-bootstrap";
import ActionButton from "./ActionButton.jsx";
import {useState} from "react";
import {attackTerritoryWithApi, reinforceTerritoryWithApi} from "./map-api.js";
import {useAuth} from "../../auth/AuthProvider.jsx";
import Spinner from "react-bootstrap/Spinner";
import {TimePassedSinceDateTime} from "../../assets/DateParser.js";

const CountryInfoBox = ({country, updateCountryHandler, removeTroopsHandler}) => {
    const [apiError, setApiError] = useState("")
    const [apiLoading, setApiLoading] = useState(false)
    const [troops, setTroops] = useState("")
    const auth = useAuth()

    function attackTerritory() {
        const dto = {
            "attackingPlayerId": auth.userId,
            "territoryId": country.id,
            "troops": troops
        }
        setApiLoading(true)

        attackTerritoryWithApi(dto).then(res => {
            let resCountry = res.data;
            updateCountryHandler(resCountry)
            removeTroopsHandler(troops)
        }, rej => {
            setApiError(rej.response.data.title)
        })
        setTroops("")
        setApiLoading(false)
    }

    function reinforceTerritory() {
        const dto = {
            "reinforcingPlayerId": auth.userId,
            "territoryId": country.id,
            "troops": troops
        }
        setApiLoading(true)

        reinforceTerritoryWithApi(dto).then(res => {
            let resCountry = res.data;
            console.log("data returned", resCountry)
            updateCountryHandler(resCountry)
            removeTroopsHandler(troops)
        }, rej => {
            setApiError(rej.response.data.title)
        })
        setTroops("")
        setApiLoading(false)
    }

    return (
        <div className={"countryInfoBox__container"}>
            <h5 className={"text-center"}>{country.ownername ? country.ownername : "Barbarians"}</h5>

            <Row>
                <Col xs={"auto"} className={"countryInfoBox__leftCol"}>
                    <p className={"mb-0"}>Troops: </p>
                    <p className={"mb-0"}>Conquered:</p>
                </Col>
                <Col className={"ps-0"}>
                    <p className={"mb-0"}>{country.troops}</p>
                    <p className={"mb-0"}>{country.timeConquered ? TimePassedSinceDateTime(country.timeConquered) : "never"}</p>
                </Col>
            </Row>
            {
                apiLoading ?
                    <Spinner/>
                    :
                    <ActionButton
                        attackTerritory={attackTerritory}
                        reinforceTerritory={reinforceTerritory}
                        troops={troops}
                        setTroops={setTroops}
                    />
            }
            {
                apiError && <p className={"countryInfoBox__apiError"}>{apiError}</p>
            }
        </div>
    )
}

export default CountryInfoBox