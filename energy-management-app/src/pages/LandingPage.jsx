import HeroSection from "../components/HeroSection";
import FeaturesCard from "../components/FeaturesCard";
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
