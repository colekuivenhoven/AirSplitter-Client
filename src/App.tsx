import './App.css';

// Libraries Import
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import downloadjs from 'downloadjs';

// Import Routes
import Home from "./routes/Home";
import About from "./routes/About";
import Split from "./routes/Split";

interface IVocalPath {
  name: string;
  type: string;
  ext: string;
}

interface IPage {
  name: string;
}

// Citations
const citations: string[] = [
  `
    1
    @article{spleeter2020,
      doi = {10.21105/joss.02154},
      url = {https://doi.org/10.21105/joss.02154},
      year = {2020},
      publisher = {The Open Journal},
      volume = {5},
      number = {50},
      pages = {2154},
      author = {Romain Hennequin and Anis Khlif and Felix Voituret and Manuel Moussallam},
      title = {Spleeter: a fast and efficient music source separation tool with pre-trained models},
      journal = {Journal of Open Source Software},
      note = {Deezer Research}
    }
  `,
]


function App() {
  const [currentPage, setCurrentPage] = useState<IPage>({name: window.location.pathname.substring(1) ? window.location.pathname.substring(1) : 'home'});
  const [screenSize, setScreenSize] = useState([window.innerWidth, window.innerHeight]);
  const [isMobile, setIsMobile] = useState(screenSize[0] < screenSize[1] ? true : false);

  useLayoutEffect(() => {
    function updateSize() {
      setScreenSize([window.innerWidth, window.innerHeight]);
      setIsMobile(window.innerWidth < window.innerHeight ? true : false);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <Router>
      <div className={`App ${isMobile ? "mobile" : ""}`}>
        <div className="navbar">
          <div className="logo" 
            style={{
              width: isMobile ? "30vmin" : "",
            }}
          />
          <div 
            className="nav-links"
            style={{
              height: isMobile ? "8vmin" : "",
            }}
          >
            <Link 
              to="/"
              className={`nav-route-btn ${(currentPage.name == 'home') ? "active" : ""}`}
              style={{
                animationDelay: '0.0s',
                fontSize: isMobile ? '5vmin' : '',
                marginRight: isMobile ? '4vmin' : '',
              }}
              onClick={() => setCurrentPage({name: 'home'})}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`nav-route-btn ${(currentPage.name == 'about') ? "active" : ""}`}
              style={{
                animationDelay: '0.2s',
                fontSize: isMobile ? '5vmin' : '',
                marginRight: isMobile ? '4vmin' : '',
              }}
              onClick={() => setCurrentPage({name: 'about'})}
            >
              About
            </Link>
            <Link 
              to="/split" 
              className={`nav-route-btn ${(currentPage.name == 'split') ? "active" : ""}`}
              style={{
                animationDelay: '0.4s',
                fontSize: isMobile ? '5vmin' : '',
                marginRight: isMobile ? '4vmin' : '',
              }}
              onClick={() => setCurrentPage({name: 'split'})}
            >
              Split
            </Link>
          </div>
        </div>
        <Switch>
          <Route path="/split">
            <Split isMobile={isMobile} />
          </Route>
          <Route path="/about">
            <About isMobile={isMobile} />
          </Route>
          <Route path="/">
            <Home isMobile={isMobile} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
