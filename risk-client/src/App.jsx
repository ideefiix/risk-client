import './App.css'
import Container from "react-bootstrap/Container";
import NavBar from "./components/navbar/NavBar.jsx";
import {useNavigate, Routes, Route, Navigate} from "react-router-dom"
import {Col} from "react-bootstrap";
import MapPage from "./pages/MapPage/MapPage.jsx";
import {useEffect, useRef, useState} from "react";
import ConstructionPage from "./pages/ConstructionPage/ConstructionPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import RequireAuth from "./auth/RequireAuth.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import {useAuth} from "./auth/AuthProvider.jsx";
import {jwtDecode} from "jwt-decode";
import {fetchPlayerFromAPI, fetchTerritoriesFromAPI} from "./api-common/api-common.js";
import Spinner from "react-bootstrap/Spinner";

function App() {
    const isMounted = useRef(false)
    const [checkingToken, setCheckingToken] = useState(true)
    const logoutTimer = useRef(null)
    const [carte, setCarte] = useState(null)
    const [player, setPlayer] = useState(null)
    const auth = useAuth()

    useEffect(() => {
        if (isMounted.current === false) {
            isMounted.current = true
            loginPlayer().then(() => {
                setCheckingToken(false)
            })
        }
    }, [])

    async function loginPlayer() {
        const token = localStorage.getItem('AUTH_TOKEN')
        if (!token) return;

        const {exp, Id, Username} = jwtDecode(token)

        const expirationTime = (exp * 1000) - 60000 // Throw token a minute early to avoid latency issues
        if (Date.now() >= expirationTime) {
            localStorage.removeItem('AUTH_TOKEN')
        } else {
            startLogOutTimer(expirationTime - Date.now())

            const promise1 = initPlayer(Id)
            const promise2 = initCarte()
            const authPromise = auth.setIdHandler(Id)

            await Promise.all([promise1, promise2, authPromise])
        }
    }

    function startLogOutTimer(milliseconds) {
        logoutTimer.current = setTimeout(() => {
            logoutTimer.current = null
            logout()
        }, milliseconds)
    }

    function logout() {
        localStorage.removeItem("AUTH_TOKEN");
        if (logoutTimer.current) { // Logout was made by user -> LogOut timer must be cleansed
            clearTimeout(logoutTimer.current)
            logoutTimer.current = null;
        }
        auth.setIdHandler(null)
    }

    async function initPlayer(id) {
        await fetchPlayerFromAPI(id).then(res => {
            setPlayer(res.data)
        }, rej => {
            localStorage.removeItem('AUTH_TOKEN')
            isMounted.current = false
        })


        /*{
                "Id": "123abc",
                "Username": "Svindlarn",
                "Color": "#6DD3CE",
                "Cash": 565,
                "Troops": 718,
                "CashIncome": 35,
                "TroopIncome": 22,
                "Kills": 7589,
                "RerollsLeft": 0
            }*/
    }

    async function initCarte() {
        const res = await fetchTerritoriesFromAPI()
        setCarte(res.data)
    }

    return (
        <Container className={"app-container"}>
            {
                checkingToken ?
                    <Spinner/>
                    :
                    <Col className={"app__col"}>
                        {player && <NavBar player={player}/>}
                        <Routes>
                            <Route path="/" element={
                                <RequireAuth>
                                    <Navigate to="/map"/>
                                </RequireAuth>
                            }/>
                            <Route path="/map" element={
                                <RequireAuth>
                                    <MapPage carte={carte} setCarte={setCarte} setPlayer={setPlayer}/>
                                </RequireAuth>
                            }/>
                            <Route path="/shop" element={
                                <RequireAuth>
                                    <ConstructionPage player={player} setPlayer={setPlayer}/>
                                </RequireAuth>
                            }/>
                            <Route path="/profile" element={
                                <RequireAuth>
                                    <ProfilePage player={player} setPlayer={setPlayer}/>
                                </RequireAuth>
                            }/>
                            <Route path="/login" element={<LoginPage loginPlayer={loginPlayer}/>}/>
                            <Route path="*" element={<p>Page not found</p>}/>

                        </Routes>
                    </Col>
            }
        </Container>
    )
}

export default App
