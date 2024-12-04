import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function AuthLayout ({children, authentication = true}) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const { authUser } = useAuthStore()

    useEffect(() => {
        if(authentication && !authUser) {
            navigate("/login")
        } else if(!authentication && authUser) {
            navigate("/")
        }
        setLoader(false)
    }, [authUser, navigate, authentication])

    return loader ? <p>Loading....</p>: <>{children}</>
}