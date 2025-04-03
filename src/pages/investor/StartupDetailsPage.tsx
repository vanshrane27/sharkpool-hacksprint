
import React from "react";
import Navbar from "@/components/common/Navbar";
import StartupDetails from "@/components/investor/StartupDetails";
import Footer from "@/components/common/Footer";

const StartupDetailsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <StartupDetails />
      </main>
      <Footer />
    </div>
  );
};

export default StartupDetailsPage;
