
import React from "react";

const features = [
  {
    name: "Startup Showcase",
    description:
      "Showcase your startup idea, achievements, and vision to potential investors looking for the next big innovation.",
    icon: "🚀",
  },
  {
    name: "Investor Network",
    description:
      "Connect with a diverse network of investors interested in supporting Indian entrepreneurship and innovation.",
    icon: "🤝",
  },
  {
    name: "Investment Tracking",
    description:
      "Easily track and manage investment proposals, negotiations, and finalized deals in one place.",
    icon: "📊",
  },
  {
    name: "Make in India Focus",
    description:
      "Support and promote the Make in India initiative by connecting local entrepreneurs with investors.",
    icon: "🇮🇳",
  },
];

const Features = () => {
  return (
    <div className="py-16 bg-india-gray overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-india-green font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Connecting Innovation with Capital
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our platform bridges the gap between visionary Indian entrepreneurs and forward-thinking investors.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6 h-full">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-india-saffron to-india-green rounded-md shadow-lg text-3xl">
                        {feature.icon}
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
