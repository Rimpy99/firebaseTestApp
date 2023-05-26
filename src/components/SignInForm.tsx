import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

type Props = {
    setIsSignUpModalActive: Dispatch<SetStateAction<boolean>>
}

export const SignInForm = ({ setIsSignUpModalActive }: Props) => {

    return(
        <Content>
            <input type="text" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            <div>
                <button>Sign in</button>
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