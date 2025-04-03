
import React from "react";

const stats = [
  { id: 1, name: "Registered Startups", value: "5,000+" },
  { id: 2, name: "Active Investors", value: "1,200+" },
  { id: 3, name: "Successful Deals", value: "820+" },
  { id: 4, name: "Total Investments", value: "₹250Cr+" },
];

const Stats = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Fueling India's Startup Ecosystem
          </h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Empowering entrepreneurs and investors to connect, collaborate, and create success stories.
          </p>
        </div>
        <dl className="mt-10 text-center sm:mx-auto sm:grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                {stat.name}
              </dt>
              <dd className="order-1 text-4xl font-extrabold text-india-navy">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Stats;
