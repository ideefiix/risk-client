import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import "./ProfilePage.css"
import {Col, Row} from "react-bootstrap";
import {rollColorFromApi} from "./profile-api.js";

const ProfilePage = ({player, setPlayer}) => {
    
    function rollColor(){
        rollColorFromApi(player.id).then(res => {
            setPlayer({
                ...player,
                color: res.data.color,
                rerollsLeft: player.rerollsLeft-1
            })
        }, rej => {
            
        })
    }
    
    return (
        <Container className={"pt-2"}>
            {player &&
                <>
                    <h5>{player.Name}</h5>
                    <p>Kills: <span>{player.kills}</span></p>
                    <p>Your color:</p>
                    <Row xs={"auto"}>
                        <Col>
                            <div className={"profilePage__colorBox"} style={{backgroundColor: `${player.color}`}}></div>
                        </Col>
                        <Col>
                            <button onClick={rollColor} className={"button__cerise"} disabled={player.rerollsLeft < 1}>Reroll</button>
                            <p style={{color:"var(--disabled_darker)"}}>{player.rerollsLeft} rolls left</p>
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