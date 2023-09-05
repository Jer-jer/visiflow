import React from 'react';
import './App.scss';

//Components
import Button from './components/button'

function App() {
  return (
    <div>
      <Button color='btn-primary' customStylings='rounded-3xl m-8 w-36 text-base normal-case font-medium' label='Log in' />
    </div>
  );
}

export default App;
