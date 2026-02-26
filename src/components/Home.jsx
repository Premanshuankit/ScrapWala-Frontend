import { Box, Typography, Button } from "@mui/material";
import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";

const Hero = lazy(() => import("./landing/Hero"))
const HowItWorks = lazy(() => import("./landing/HowItWorks"))

function Home() {
    return (
      <>
        <Suspense fallback= "lodaing...">
          <Hero />
          <HowItWorks />
        </Suspense>
      </>
    );
}

export default Home;