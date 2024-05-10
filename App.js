import "./App.css";
import Home from "./Home";
import Departmen from "./Departmen";
import Employee from "./Employee";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">
          React.js ile Core Web APİ Tüketmek
        </h3>
        <nav className="navbar navbar-expand-sm navbar-dark" style={{ backgroundColor: '#532b97',borderRadius: 5}}>
          <ul className="navbar-nav">
            <li className="nav-item m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/home">
                Anasayfa
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/department"
              >
                Departmanlar
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/employee"
              >
                Çalışanlar
              </NavLink>
            </li>
          </ul>
        </nav>
        {/* Switch yerine Routes Kullandik.Switch de component = Routes da element kullanılır.*/}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/department" element={<Departmen />} />
          <Route path="/employee" element={<Employee />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
