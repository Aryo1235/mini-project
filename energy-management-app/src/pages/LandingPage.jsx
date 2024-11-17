import HeroSection from "../components/LandingPage/HeroSection";
import FeaturesCard from "../components/LandingPage/FeaturesCard";

export default function LandingPage() {
  return (
    <div className=" dark:bg-gray-900 min-h-screen">
      <HeroSection />
      <FeaturesCard />
      {/* End Hero */}
    </div>
  );
}
