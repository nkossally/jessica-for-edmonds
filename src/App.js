import logo from "./logo.svg";
import { Routes, Route, HashRouter } from "react-router-dom";
import { useState, useEffect } from "react";

import { Home } from "./Pages/Home";
import { Platform } from "./Pages/Platform";
import { Volunteer } from "./Pages/Volunteer";
import { NavBar } from "./Components/NavBar";
import { Footer } from "./Components/Footer";

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

  let baseUrl = `${window.location.protocol}//${window.location.host}`;
  if (baseUrl[baseUrl.length - 1] !== "/") {
    baseUrl += "/";
  }
  return (
    <HashRouter>
      {isVisible && <NavBar />}
      <div className={isVisible ? "add-margin-for-nav-bar" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/platform" element={<Platform />} />
           <Route path="/volunteer" element={<Volunteer />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
