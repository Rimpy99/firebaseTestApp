import { useState, useEffect } from "react";
// import { auth } from "../config/firebase";

export const FormComponent = () => {
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ password2, setPassword2 ] = useState<string>('');
    const [ passwordMatchingError, setPasswordMatchingError ] = useState<boolean>(false)

    useEffect(() => {

        if(password != password2){
            setPasswordMatchingError(true)
        }else{
            setPasswordMatchingError(false)
        }

    }, [ password, password2 ])

    return(
        <div>
            <input type="text" onChange={(e) => setEmail(e.target.value)}/>
            <div>
                { passwordMatchingError && 'Passwords must be the same!' }
            </div>
            <input type="password" onChange={(e) => setPassword(e.target.value)}/>
            <input type="password" onChange={(e) => setPassword2(e.target.value)}/>
            <button>Sing up</button>
        </div>
    )
}
