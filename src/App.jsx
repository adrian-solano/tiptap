// React
import React, { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';

// Style
import './sass/main.scss';

// Paginas
import Tiptap from './pages/Tiptap';

function App() {

  const routes = useMemo(() => {

    return (
      <>
        <Route path="/" element={<Tiptap />} />
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