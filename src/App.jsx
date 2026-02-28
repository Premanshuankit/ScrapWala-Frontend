import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import Dashboard from "./pages/Dashboard";
import Listing from "./pages/Listing";
import Seller from "./pages/Seller";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";

const Home = lazy(() => import("./components/Home"));

function App() {
    return (
      <Router>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </Router>
    );
}

export default App;