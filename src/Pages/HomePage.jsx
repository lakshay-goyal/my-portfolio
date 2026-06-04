import { useState, useEffect } from "react";
import HeroSection from "../Components/HeroSection";
import Loading from '../Components/Loading';
import NavBar from "../Components/NavBar";

function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-[#070707] text-zinc-100 selection:bg-white selection:text-zinc-950">
      <HeroSection />
      <NavBar />
    </div>
  );
}

export default HomePage;
