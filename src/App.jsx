import React, { useState } from 'react';
import Rival from './Rival';
import Controller from './components/Controller';

export default function App() {
  const [rivals, setRivals] = useState([new Rival(0)]);

  return (
    <>
      <Controller />
    </>
  );
}
