import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./frontend/App.jsx";
import Admin from "./admin/Admin.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  </BrowserRouter>
);
