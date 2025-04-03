
import React from "react";
import Navbar from "@/components/common/Navbar";
import StartupDashboard from "@/components/startup/StartupDashboard";
import Footer from "@/components/common/Footer";

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <StartupDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
