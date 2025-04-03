import React from "react";
import { Navbar } from "@/components/common/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Stats from "@/components/home/Stats";
import { Footer } from "@/components/common/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Stats />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
