import { FormComponent } from './components/FormComponent';
import { Header } from './components/Header';
import { useState } from 'react';

function App() {
  const [ isSignUpModalActive, setIsSignUpModalActive ] = useState<boolean>(false)

  return (
    <div className="App">
      <Header 
        setIsSignUpModalActive={setIsSignUpModalActive} 
      />
      { isSignUpModalActive && <FormComponent setIsSignUpModalActive={setIsSignUpModalActive}/> }
    </div>
  );
}

export default App;
