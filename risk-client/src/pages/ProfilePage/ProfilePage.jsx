import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import "./ProfilePage.css"
import {Col, Row} from "react-bootstrap";

const ProfilePage = ({player, setPlayer}) => {
    
    function rollColor(){
        
    }
    return (
        <Container className={"pt-2"}>
            {player &&
                <>
                    <h5>{player.Name}</h5>
                    <p>Kills: <span>{player.Kills}</span></p>
                    <p>Your color:</p>
                    <Row xs={"auto"}>
                        <Col>
                            <div className={"profilePage__colorBox"} style={{backgroundColor: "red"}}></div>
                        </Col>
                        <Col>
                            <button onClick={rollColor} className={"button__cerise"} disabled={player.RerollsLeft < 1}>Reroll</button>
                            <p style={{color:"var(--disabled_darker)"}}>{player.RerollsLeft} rolls left</p>
                        </Col>
                        
                    </Row>
                </>
            }
            {!player &&
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            }

        </Container>
    )
}

export default ProfilePage