import "./MapPage.css"
import {Col, Row} from "react-bootstrap";

const CountryInfoBox = ({country}) => {
    return (
        <div className={"countryInfoBox__container"}>
            <h5 className={"text-center"}>{country.owner}</h5>

            <Row>
                <Col xs={"auto"} className={"countryInfoBox__leftCol"}>
                    <p className={"mb-0"}>Troops: </p>
                    <p className={"mb-0"}>Conquered:</p>
                </Col>
                <Col className={"ps-0"}>
                    <p className={"mb-0"}>{country.troop}</p>
                    <p className={"mb-0"}>{country.timeConquered}</p>
                </Col>

            </Row>
        </div>
    )
}

export default CountryInfoBox