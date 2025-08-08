// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AboutProduct from "./Pages/About_product";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<AboutProduct />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;