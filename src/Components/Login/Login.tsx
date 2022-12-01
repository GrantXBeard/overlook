import React, { useState } from "react";

interface ILoginProps {
    handleUserInput: (username: string, password: string) => void
}

const Login = ({ handleUserInput }: ILoginProps) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div>
            <form onSubmit={(e) => {e.preventDefault(); handleUserInput(username, password)}}>
                <input name="username" type='text' placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
                <input name="password" type='text' placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                <input type='submit'></input>
            </form>
        </div>
    )
}

export default Login;