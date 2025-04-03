import React from "react";
import { Navbar } from "@/components/common/Navbar";
import { StartupList } from "@/components/investor/StartupList";
import { Footer } from "@/components/common/Footer";

const StartupListingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <StartupList />
      </main>
      <Footer />
    </div>
  );
};

export default StartupListingPage;
