import { useState } from "react"


export default function SignUpForm({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
 

    async function handleSubmit (event) {
        event.preventDefault();

        try {
            const response = await fetch (`https://fsa-jwt-practice.herokuapp.com/signup`, 
           { method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({
               username: username.trim(),
               password: password,
           }),
           });
            const result = await response.json();
            if (result.token) {
                setToken(result.token);
            }else {
                setError("Please try again");
            }
            console.log(result);
        }catch(err){
        console.log(err.message);
        setError(err.message);
        }
    }
    return (
    <div classname = "form">
        <h2>Sign Up</h2>
        {error && <p>{error}</p>}
    <form onSubmit={handleSubmit}>
        <label>
            Username: <input type="text" value={username} onChange={(e)=> {
                if (e.target.value.length <= 8) {
                    setUsername(e.target.value);}
                }}
                    />
        </label>
        {username.length > 10?
        <p>Username must be less than 10 characters</p>
    :null}
        <br />
        <label>
            Password: <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
        </label>
        <br />
        <button type="submit">Submit</button>
    </form>
    </div>
    );
}