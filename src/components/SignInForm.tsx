import { useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useIsUserLogged } from '../store/store';

type Props = {
    setIsSignUpModalActive: Dispatch<SetStateAction<boolean>>
}

export const SignInForm = ({ setIsSignUpModalActive }: Props) => {
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');

    const updateUserStatus = useIsUserLogged((state) => state.updateStatus)

    const signIn = async() => {
        try{
            await signInWithEmailAndPassword(auth, email, password)
            console.log(auth.currentUser)
            updateUserStatus()
        }catch(err){
            console.log(err)
        }
    }

    const signInClicked = () =>  {
        if(email !== '' && password !== ''){
            signIn()
        }
    }

    return(
        <Content>
            <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            <div>
                <button onClick={() => signInClicked()}>Sign in</button>
            </div>
            or
            <div>
                <button onClick={() => setIsSignUpModalActive(true)}>Sign up</button>
            </div>
        </Content>
    )
}

const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`