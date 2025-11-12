import Navigation from "@/components/ui/Navigation";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Hero from "@/components/sections/Hero";
import TrustSignals from "@/components/sections/TrustSignals";
import TechStack from "@/components/sections/TechStack";
import CareerTimeline from "@/components/sections/CareerTimeline";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navigation />

      <main className="min-h-screen">
        <Hero />
        <TrustSignals />
        <TechStack />
        <CareerTimeline />
        <Projects />
        <Skills />
        <Process />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
