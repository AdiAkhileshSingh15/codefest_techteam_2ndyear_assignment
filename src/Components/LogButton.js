import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

const LogButton = ({text,onclick}) => {
    return (
        <button onClick={onclick}>{text}</button>
    )
}

export default LogButton