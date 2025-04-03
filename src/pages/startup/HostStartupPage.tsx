
import React from "react";
import Navbar from "@/components/common/Navbar";
import HostStartupForm from "@/components/startup/HostStartupForm";
import Footer from "@/components/common/Footer";

const HostStartupPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <HostStartupForm />
      </main>
      <Footer />
    </div>
  );
};

export default HostStartupPage;
