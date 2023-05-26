import { useEffect, Dispatch, SetStateAction } from "react";
import styled from 'styled-components';
import { SignUpForm } from "./SignUpForm";

type Props = {
    setIsSignUpModalActive: Dispatch<SetStateAction<boolean>>
}

export const FormComponent = ({ setIsSignUpModalActive }: Props) => {

    const handleKeyPress = (event: KeyboardEvent) => {
      event.key === 'Escape' && setIsSignUpModalActive(false)
    }
    
    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };
    }, [ handleKeyPress ]);

    return(
        <Container onClick={() => setIsSignUpModalActive(false)}>
            <Modal onClick={e => e.stopPropagation()}>
                <SignUpForm />
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
    backdrop-filter: blur(4px);
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