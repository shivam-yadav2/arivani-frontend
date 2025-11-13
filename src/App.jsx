import { Button } from "@/components/ui/button";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";
import Update from "./pages/Update";
import { useEffect } from "react";

function App() {
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="/update/:id" element={<Update/>} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
