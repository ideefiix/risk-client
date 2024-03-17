import {useRef, useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useAuth} from "../../auth/AuthProvider.jsx";
import "./LoginPage.css"
import {Button, Image} from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import riskImage from "../../assets/Risk_logo.png" 

const LoginPage = ({loadPlayer}) => {
    const navigate = useNavigate()
    const auth = useAuth()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState(null)
    const [loading, setLoading] = useState(false)
    const [newAccount, setNewAccount] = useState(false)
    const passwordTips = ["Dont use your bank code. Use your friends.", "Dont forget your password.", "There is no going back."]
    const selectedPasswordIndex = useRef(Math.floor(Math.random() * 3))
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    async function handleLogin() {

        setLoading(true)

        /*login(username, password)
            .then(res => {
                localStorage.setItem("AUTH_TOKEN", res.data);

                const {id} = jwtDecode(res.data)
                loadPlayer(id)
            }, rej => {
                setErrorText(rej.response.data)
                setLoading(false)
            })*/
    }
    
    async function handleRegister(){
        setLoading(true)
        setTimeout(() => {
            auth.setIdHandler("123")
            return <Navigate to="/map" />
        }, 1000)
    }

    if(auth.userId) return <Navigate to="/map" />

    return (
        <div className={"mt-4"}>
            <Image src={riskImage} width="100%" />
            <div className="loginPage__container">
                {
                    newAccount &&
                    <form className="loginPage__form" >
                        <div>
                            <label htmlFor="username">New username:</label>
                            <input type="text" id="username" value={username} onChange={handleUsernameChange}/>
                        </div>
                        <div>
                            <label htmlFor="password">New password:</label>
                            <input type="password" id="password" value={password} onChange={handlePasswordChange}/>
                        </div>
                        {errorText && <p className="errorText">{errorText}</p>}
                        <p className={"small-text mt-1 mb-1"} style={{color: "var(--disabled_darker)"}}>TIP: {passwordTips[selectedPasswordIndex.current]} </p>
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
                            <Button onClick={handleRegister} style={{width: "100px", marginTop: "8px"}}>Register</Button>
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
                        {errorText && <p className="errorText">{errorText}</p>}
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
                        <p onClick={() => setNewAccount(true)} className="loginPage__registerText mt-2 mb-0">No account? Register
                            here</p>
                    </form>
                }
            </div>
        </div>

    )
}

export default LoginPage