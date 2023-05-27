import { useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { AiOutlineUser } from "react-icons/ai";
import { useIsUserLogged } from '../store/store';
import { SignInForm } from './SignInForm';
import { auth } from '../config/firebase';
import { signOut } from "firebase/auth";

type Props = {
    setIsSignUpModalActive: Dispatch<SetStateAction<boolean>>
}

export const Header = ({ setIsSignUpModalActive }: Props) => {
    const [ isDropdownActive, setIsDropdownActive ] =  useState<boolean>(false)
    const userStatus = useIsUserLogged((state) => state.status)
    const updateUserStatus = useIsUserLogged((state) => state.updateStatus)

    const profileIconClicked = () => {
        // if(!userStatus){
        setIsDropdownActive(state => !state)
        // }
    }

    const signOutClicked = async() => {
        await signOut(auth)
        updateUserStatus()
    }

    return(
        <Container>
            {
                userStatus && <h1>{auth.currentUser?.displayName}</h1>
            }
            <ProfileIcon onClick={() => profileIconClicked()}>
                <AiOutlineUser size="20" color="white"/>
            </ProfileIcon>
            {isDropdownActive && !userStatus && 
                <Dropdown onClick={e => e.stopPropagation()}>
                    <SignInForm setIsSignUpModalActive={setIsSignUpModalActive}/>
                </Dropdown>
            }
            {isDropdownActive && userStatus && 
                <Dropdown onClick={e => e.stopPropagation()}>
                    <SignOutBtn onClick={() => signOutClicked()}>Sign out</SignOutBtn>
                </Dropdown>
            }
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #d9d9d9;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
`

const ProfileIcon = styled.button`
    width: 40px;
    height: 40px;
    margin-right: 30px;
    border-radius: 50%;
    border: none;
    background: rgb(51,75,161);
    cursor: pointer;
    transition: background 0.3s;

    &:hover{
        background-color: #485ba1;
    }
`

const Dropdown = styled.div`
    position: absolute;
    right: 12px;
    top: 125%;
    border: 1px solid #dedede;
    border-radius: 5px;
`

const SignOutBtn = styled.button`

`