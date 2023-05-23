import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { AiOutlineUser } from "react-icons/ai";

type Props = {
    setIsLoginModalActive: Dispatch<SetStateAction<boolean>>
}

export const Header = ({ setIsLoginModalActive }: Props) => {

    return(
        <Container>
            <SignUpButton onClick={() => setIsLoginModalActive(true)}>
                <AiOutlineUser size="20" color="white"/>
            </SignUpButton>
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
`

const SignUpButton = styled.button`
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