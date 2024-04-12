import "./navbar.css"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import {useNavigate} from "react-router-dom";
import PlayerBank from "./PlayerBank.jsx";
import riskLogo from "../../assets/Risk_logo.png"

const NavBar = ({cash, troops}) => {
    const navigate = useNavigate()

    function navigateTo(path) {
        navigate(path)
    }

    return (
        <Navbar className="bg-body-tertiary navbar__container">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        src={riskLogo}
                        width="144"
                        height="48"
                        alt="Risk Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigateTo("/map")}>Map</Nav.Link>
                        <Nav.Link onClick={() => navigateTo("/shop")}>Constructiongit </Nav.Link>
                        <Nav.Link onClick={() => navigateTo("/profile")}>Profile</Nav.Link>
                    </Nav>
                    <PlayerBank cash={cash} troops={troops}/>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar