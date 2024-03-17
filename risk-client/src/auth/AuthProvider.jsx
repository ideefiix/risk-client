import {createContext, useContext, useState} from "react";

const AuthContext = createContext(null)

export function AuthProvider({children}) {
    const [userId, setUserId] = useState(null)

    async function setIdHandler(id) {
        setUserId(id)
    }

    return (
        <AuthContext.Provider value={{ userId, setIdHandler}}>
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth() {
    return useContext(AuthContext)
}