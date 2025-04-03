import React from "react";
import { StartupDashboard } from "@/components/startup/StartupDashboard";
import { StartupChatbot } from "@/components/startup/StartupChatbot";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <StartupDashboard />
          </div>
          <div>
            <StartupChatbot />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
