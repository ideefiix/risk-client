import './App.css'
import Container from "react-bootstrap/Container";
import NavBar from "./components/navbar/NavBar.jsx";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom"
import {Col} from "react-bootstrap";
import MapPage from "./pages/MapPage/MapPage.jsx";
import {useEffect, useRef, useState} from "react";
import {colorArr} from "./assets/colorArr.js";
import ShopPage from "./pages/ShopPage/ShopPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import RequireAuth from "./auth/RequireAuth.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import {useAuth} from "./auth/AuthProvider.jsx";
function App() {
    const isMounted = useRef(false)
    const [carte, setCarte] = useState(null)
    const [player, setPlayer] = useState(null)
    const auth = useAuth()
    
    useEffect(() => {
        if(isMounted.current === false){
            fetchCarte()
            fetchPlayer()
            isMounted.current = true
        }
    }, [])
    
    async function fetchPlayer(){
        setTimeout(() => {
            setPlayer({
                "Id": "123abc",
                "Name": "Svindlarn",
                "Color": "#6DD3CE",
                "Cash": 565,
                "Troops": 718,
                "CashIncome": 35,
                "TroopIncome": 22,
                "Kills": 7589,
                "RerollsLeft": 0
            })
        }, 1000)
    }
    async function fetchCarte(){
        setTimeout(() => {
            setCarte(colorArr)
        }, 1000)
    }

    return (
        <Container className={"app-container"}>
            <Col className={"app__col"}>
                {auth.userId && <NavBar cash={1337} troops={588} />}
                <Routes>
                    <Route path="/" element={
                        <RequireAuth>
                        <Navigate to="/map"/>
                        </RequireAuth>
                    } />
                    <Route path="/map" element={
                        <RequireAuth>
                        <MapPage carte={carte} />
                        </RequireAuth>
                    } />
                    <Route path="/shop" element={
                        <RequireAuth>
                        <ShopPage />
                        </RequireAuth>
                    } />
                    <Route path="/profile" element={
                        <RequireAuth>
                        <ProfilePage player={player} setPlayer={setPlayer} />
                        </RequireAuth>
                    } />
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="*" element={<p>Page not found</p>} />

                </Routes>
            </Col>
        </Container>
    )
}

export default App
