import React from "react";
import { Navbar } from "@/components/common/Navbar";
import InvestmentsList from "@/components/investor/InvestmentsList";
import { Footer } from "@/components/common/Footer";

const InvestmentsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <InvestmentsList />
      </main>
      <Footer />
    </div>
  );
};

export default InvestmentsPage;
