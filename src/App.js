import logo from "./logo.svg";
import { Routes, Route, HashRouter } from "react-router-dom";
import { useState, useEffect } from "react";

import { Home } from "./Pages/Home";
import { Platform } from "./Pages/Platform";
import { Volunteer } from "./Pages/Volunteer";
import { NavBar } from "./Components/NavBar";
import { Footer } from "./Components/Footer";
import { DonatePage } from "./Pages/DonatePage";

const SCROLL_THRESHOLD = 5;

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [keepVisible, setKeepVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1000) {
      setIsVisible(true);
    }
  }, [window.innerWidth]);

  let baseUrl = `${window.location.protocol}//${window.location.host}`;
  if (baseUrl[baseUrl.length - 1] !== "/") {
    baseUrl += "/";
  }
  return (
    <HashRouter>
      {isVisible && <NavBar />}
      {!isVisible && <div className="nav-bar-empty "></div>}
      <div className={isVisible ? "add-margin-for-nav-bar" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/platform" element={<Platform />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
