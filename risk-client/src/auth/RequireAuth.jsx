import {useAuth} from "./AuthProvider.jsx";
import {Navigate} from "react-router-dom";

const RequireAuth = (props) => {
    const auth = useAuth()

    if(auth.userId === null) return <Navigate to='/login' />

    return (
        props.children
    )
}

export default RequireAuth