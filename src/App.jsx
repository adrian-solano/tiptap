// React
import React, { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';

// Style
// import './scss/main.scss';

// Paginas
import Index from './pages/Index';
// import PhoneTest from './pages/PhoneTest';

function App() {

  const routes = useMemo(() => {

    return (
      <>
        <Route path="/" element={<Index />} />
      </>
    );
  }, []);

  return (
    <Routes>
      {routes}
    </Routes>
  );
}

export default App;