import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav>
      <button onClick={() => navigate("/")}>메인 페이지(pagination)</button>
      <button onClick={() => navigate("/mainInfinity")}>메인 페이지(infinity api)</button>
      <button onClick={() => navigate("/about")}>mutation && invalidation</button>
    </nav>
  );
}
