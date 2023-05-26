import styled from 'styled-components';
import { useState, useEffect } from "react";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../config/firebase';

import { useIsUserLogged } from '../store/store';

export const SignUpForm = () => {
    const [ login, setLogin ] = useState<string>('');
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ password2, setPassword2 ] = useState<string>('');
    const [ passwordMatchingError, setPasswordMatchingError ] = useState<boolean>(false)

    const updateUserStatus = useIsUserLogged((state) => state.updateStatus)

    const clearStates = () => {
        setLogin('')
        setEmail('')
        setPassword('')
        setPassword2('')
        setPasswordMatchingError(false)
    }

    useEffect(() => {
        if(password !== password2){
            setPasswordMatchingError(true)
        }else{
            setPasswordMatchingError(false)
        }
    }, [ password, password2 ])

    const singUp = async() => {
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(res.user, {
                displayName: login
            })
            updateUserStatus()
            console.log(auth.currentUser)
            clearStates()
        }catch(err){
            console.error(err)
        }
    }

    const signUpClicked = () => {
        if(login !== '' && email !== '' && password !== '' && passwordMatchingError === false){
            singUp()
        }
    }

    return(
        <>
            EMAIL
            <StyledInput type="text" onChange={(e) => setEmail(e.target.value)}/>
            LOGIN
            <StyledInput type="text" onChange={(e) => setLogin(e.target.value)}/>
            <PasswordErrorDiv>
                { passwordMatchingError && 'Passwords must be the same!' }
            </PasswordErrorDiv>
            PASSWORD
            <StyledInput type="password" onChange={(e) => setPassword(e.target.value)}/>
            REPEAT PASSWORD
            <StyledInput type="password" onChange={(e) => setPassword2(e.target.value)}/>
            <div>
                <SignUpBtn onClick={() => signUpClicked()}>Sing up</SignUpBtn>
            </div>
        </>
    )
}

const StyledInput = styled.input`
    padding: 10px;
    margin: 15px;
    border-radius: 10px;
    border: none;
    font-size: 15px;
    width: 300px;
`

const PasswordErrorDiv = styled.div`
    height: 30px;
`

const SignUpBtn = styled.button`
    margin-top: 10px;
    padding: 7px 10px;
    font-size: 15px;
    border-radius: 5px;
    border: none;
    letter-spacing: 1px;
    font-weight: bold;
    background-color: #6ea5ff;
    color: #002070;
    cursor: pointer;
    transition: background 0.3s;

    &:hover{
        background-color: #8cb6fa; 
    }
`