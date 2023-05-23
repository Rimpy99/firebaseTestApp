import React from 'react';
import { FormComponent } from './components/FormComponent';
import { Header } from './components/Header';
import { useState } from 'react';

function App() {

  const [ isLoginModalActive, setIsLoginModalActive ] = useState<boolean>(false)

  return (
    <div className="App">
      <Header setIsLoginModalActive={setIsLoginModalActive}/>
      { isLoginModalActive && <FormComponent /> }
    </div>
  );
}

export default App;
