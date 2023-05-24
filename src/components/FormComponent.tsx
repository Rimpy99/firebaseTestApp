import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase';
import styled from 'styled-components';
// import { auth } from "../config/firebase";

type Props = {
    isLoginModalActive: boolean,
    setIsLoginModalActive: Dispatch<SetStateAction<boolean>>
}

type styledComponentsProps = {
    isSignUpActive: boolean,
}

export const FormComponent = ({ isLoginModalActive, setIsLoginModalActive }: Props) => {
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ password2, setPassword2 ] = useState<string>('');
    const [ passwordMatchingError, setPasswordMatchingError ] = useState<boolean>(false)
    const [ isSignUpActive, setIsSignUpActive ] = useState<boolean>(true)


    const clearInputs = () => {
        setEmail('')
        setPassword('')
        setPassword2('')
        setPasswordMatchingError(false)
    }


    const singUp = async() => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            clearInputs()
        }catch(err){
            console.error(err)
        }
    }


    // const signIn = async() => {
    //     try{
    //         await signInWithEmailAndPassword(auth, email, password)
    //         const user = userCredential.user
    //         clearInputs()
    //     }catch(err){
    //         console.error(err)
    //     }
    // }


    const signUpClicked = () => {
        if(email != '' && password != '' && passwordMatchingError == false){
            singUp()
        }
    }


    // const signInClicked = () => {
    //     if(email != '' && password != ''){
    //         signIn()
    //     }
    // }


    useEffect(() => {

        if(password != password2){
            setPasswordMatchingError(true)
        }else{
            setPasswordMatchingError(false)
        }

    }, [ password, password2 ])

    const handleKeyPress = (event: KeyboardEvent) => {
      event.key === 'Escape' && setIsLoginModalActive(false)
    }
    
    useEffect(() => {
    
        document.addEventListener('keydown', handleKeyPress);
    
        return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };

    }, [ handleKeyPress ]);

    return(
        <Container onClick={() => setIsLoginModalActive(false)}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <SigningOptions>
                    <SigningOptionsBtn onClick={() => setIsSignUpActive(true)} isSignUpActive={isSignUpActive ? true : false}>Sign up</SigningOptionsBtn>
                    <SigningOptionsBtn onClick={() => setIsSignUpActive(false)} isSignUpActive={isSignUpActive ? false : true}>Sign in</SigningOptionsBtn>
                </SigningOptions>
                EMAIL
                <StyledInput type="text" onChange={(e) => setEmail(e.target.value)}/>
                <PasswordErrorDiv>
                    { isSignUpActive &&  passwordMatchingError && 'Passwords must be the same!' }
                </PasswordErrorDiv>
                PASSWORD
                <StyledInput type="password" onChange={(e) => setPassword(e.target.value)}/>
                { isSignUpActive ?
                    <RepeatDiv>
                        REPEAT PASSWORD
                        <StyledInput type="password" onChange={(e) => setPassword2(e.target.value)}/>
                        <div>
                            <SignUpBtn onClick={() => signUpClicked()}>Sing up</SignUpBtn>
                        </div>
                    </RepeatDiv>

                    :

                    <div>
                        <SignUpBtn>Sing in</SignUpBtn>
                    </div>
                }
            </Modal>
        </Container>
    )
}

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
`

const Modal = styled.div`
    background-color: rgb(51,75,161);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 40px;
    text-align: center;
    font-weight: bold;
    color: white;
    height: 400px;
`

const SigningOptions = styled.div`
    margin: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #6ea5ff;
`

const SigningOptionsBtn = styled.button<styledComponentsProps>`
    margin: 0 5px;
    padding: 7px 10px;
    font-size: 15px;
    border-radius: 5px;
    border: none;
    letter-spacing: 1px;
    font-weight: bold;
    background-color: ${props => props.isSignUpActive ? `#b3d4fc` : `#6ea5ff`};
    color: #002070;
    cursor: pointer;
    transition: background 0.3s;

    &:hover{
        background-color: #8cb6fa; 
    }
`

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

const RepeatDiv = styled.div`
    display: flex;
    flex-direction: column;
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