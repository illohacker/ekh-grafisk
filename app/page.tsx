import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import About from "@/components/About";
import CtaBanner from "@/components/CtaBanner";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Clients />
      <Services />
      <About />
      <CtaBanner />
      <ContactForm />
      <Footer />
    </>
  );
}
