import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import PeoplePage from "./pages/PeoplePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PeoplePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
