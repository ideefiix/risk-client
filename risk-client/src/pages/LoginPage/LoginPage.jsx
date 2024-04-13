import {useRef, useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useAuth} from "../../auth/AuthProvider.jsx";
import "./LoginPage.css"
import {Button, Image} from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import riskImage from "../../assets/Risk_logo.png"
import {createTokenFromApi, registerPlayerWithApi} from "./login-api.js";

const LoginPage = ({loginPlayer}) => {
    const navigate = useNavigate()
    const auth = useAuth()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState(null)
    const [loading, setLoading] = useState(false)
    const [newAccount, setNewAccount] = useState(false)
    const passwordTips = ["Dont use your bank code. Use your friends.", "Dont forget your password.", "There is no going back from this."]
    const selectedPasswordIndex = useRef(Math.floor(Math.random() * 3))
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    async function handleLogin() {

        setLoading(true)

        createTokenFromApi({
            username: username,
            password: password
        }).then(res => {
            localStorage.setItem("AUTH_TOKEN", res.data);
            loginPlayer()
        }, rej => {
            setLoading(false)
            setErrorText(rej.response.data)
        })
    }

    async function handleRegister() {
        setLoading(true)
        const dto = {
            "username": username,
            "password": password
        }
        registerPlayerWithApi(dto).then(res => {
            handleLogin()
        }, rej => {
            setLoading(false)
            setErrorText(rej.response.data)
        })
            
    }

    if (auth.userId) return <Navigate to="/map"/> //Will redirect when player login.

    return (
        <div className={"mt-4"}>
            <Image src={riskImage} width="100%"/>
            <div className="loginPage__container">
                {
                    newAccount &&
                    <form className="loginPage__form">
                        <div>
                            <label htmlFor="username">New username:</label>
                            <input type="text" id="username" value={username} onChange={handleUsernameChange}/>
                        </div>
                        <div>
                            <label htmlFor="password">New password:</label>
                            <input type="password" id="password" value={password} onChange={handlePasswordChange}/>
                        </div>
                        {errorText && <p className="errorText mb-0">{errorText}</p>}
                        <p className={"small-text mt-1 mb-1"}
                           style={{color: "var(--disabled_darker)"}}>TIP: {passwordTips[selectedPasswordIndex.current]} </p>
                        {loading ?
                            <Button style={{width: "100px", marginTop: "8px"}} disabled>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                Loading...
                            </Button>
                            :
                            <Button onClick={handleRegister}
                                    style={{width: "100px", marginTop: "8px"}}>Register</Button>
                        }
                    </form>
                }
                {
                    !newAccount &&
                    <form className="loginPage__form">
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" value={username} onChange={handleUsernameChange}/>
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" value={password} onChange={handlePasswordChange}/>
                        </div>
                        {errorText && <p className="errorText mb-0">{errorText}</p>}
                        {loading ?
                            <Button style={{width: "100px", marginTop: "8px"}} disabled>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                Loading...
                            </Button>
                            :
                            <Button onClick={handleLogin} style={{width: "100px", marginTop: "8px"}}>Login</Button>
                        }
                        <p onClick={() => setNewAccount(true)} className="loginPage__registerText mt-2 mb-0">No account?
                            Register
                            here</p>
                    </form>
                }
            </div>
        </div>

    )
}

export default LoginPage