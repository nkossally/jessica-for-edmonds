import logo from "./logo.svg";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

import { Home } from "./Pages/Home";
import { About } from "./Pages/About";

function App() {
  return (
    <BrowserRouter>
      {/* <Link to="/">Home</Link>
      <Link to="/about">About</Link> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
