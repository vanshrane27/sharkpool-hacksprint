
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative bg-india-navy text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-india-saffron opacity-20 blur-3xl"></div>
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-india-green opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 h-96 w-96 rounded-full bg-india-saffron opacity-20 blur-3xl"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
          <span className="text-india-saffron">India's</span> Premier Startup-Investor Connection Platform
        </h1>
        <div className="animate-spotlight absolute -top-40 left-1/2 h-80 w-80 rotate-12 bg-india-green opacity-10 rounded-full"></div>
        <p className="mt-6 text-xl max-w-3xl">
          Empowering Indian startups to connect with investors for growth and innovation under the
          <span className="font-bold"> #MakeInIndia</span> initiative.
        </p>
        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
          <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
            <Link to="/register?role=startup">
              <Button size="lg" className="w-full bg-india-saffron hover:bg-orange-500 text-white">
                Launch Your Startup
              </Button>
            </Link>
            <Link to="/register?role=investor">
              <Button size="lg" className="w-full bg-india-green hover:bg-green-700 text-white">
                Join as an Investor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
