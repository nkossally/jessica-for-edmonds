import logo from "./logo.svg";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

import { Home } from "./Pages/Home";
import { About } from "./Pages/About";
import { NavBar } from "./Components/NavBar";
import { Footer } from "./Components/Footer";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={< Home />} />

      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
