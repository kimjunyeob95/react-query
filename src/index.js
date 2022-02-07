import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Main from "./pages/Main";
import MainInfinity from "./pages/MainInfinity";
import MovieDetail from "./pages/movie/MovieDetail";
import About from "./pages/About";

import Navbar from "./components/Navbar";

const queryClient = new QueryClient();
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <div className="App">
        <h1>React Query</h1>
        <Navbar />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/mainInfinity" element={<MainInfinity />} />
          <Route path="/about" element={<About />} />
          <Route path="/detail/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
  document.getElementById("root")
);
