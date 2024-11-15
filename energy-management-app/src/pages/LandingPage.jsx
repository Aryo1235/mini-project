import HeroSection from "../components/LandingPage/HeroSection";
import FeaturesCard from "../components/LandingPage/FeaturesCard";
import SimpleFooter from "../components/Footer";
export default function LandingPage() {
  return (
    <div className=" dark:bg-gray-900 min-h-screen">
      <HeroSection />
      <FeaturesCard />
      {/* End Hero */}
      <SimpleFooter />
    </div>
  );
}
