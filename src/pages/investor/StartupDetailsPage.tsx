import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { StartupDetails } from "@/components/investor/StartupDetails";

const StartupDetailsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <StartupDetails />
      </main>
      <Footer />
    </div>
  );
};

export default StartupDetailsPage;
