import React from 'react';

const About = () => {
  const companyInfo = {
    name: 'Sultan Estate',
    tagline: 'Your Trusted Real Estate Partner',
    description: [
      {
        id: 1,
        content:
          'Sultan Estate is a trusted and rapidly growing real estate agency dedicated to helping clients buy, sell, and rent premium properties across Pakistan. With a strong focus on transparency, reliability, and customer satisfaction, we aim to make every real estate transaction a seamless experience.',
      },
      {
        id: 2,
        content:
          'Our mission is to empower our clients with expert guidance, accurate market insights, and personalized service. Whether you\'re investing in your first home, selling your property, or seeking a rental opportunity, Sultan Estate provides the professional support and honest advice you need to make confident decisions.',
      },
      {
        id: 3,
        content:
          'Backed by a team of experienced real estate professionals, Sultan Estate combines market expertise with integrity and innovation. We believe real estate isn\'t just about property—it\'s about people, trust, and building lasting relationships. At Sultan Estate, your goals are our priority, and your success is our success.',
      },
    ],
  };

  return (
    <section className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-3">
          About {companyInfo.name}
        </h1>
        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        <p className="text-slate-600 mt-3 text-lg">{companyInfo.tagline}</p>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {companyInfo.description.map((paragraph, index) => (
          <div
            key={paragraph.id}
            className={`bg-white rounded-xl shadow-sm p-6 sm:p-8 transition-all duration-300 hover:shadow-md ${index % 2 === 0 ? '' : 'bg-gray-50'
              }`}
          >
            <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
              {paragraph.content}
            </p>
          </div>
        ))}
      </div>

      {/* Call to Action or Additional Info */}
      <div className="mt-12 bg-blue-50 rounded-xl p-6 sm:p-8 text-center border border-blue-100">
        <p className="text-slate-700 font-medium">
          🤝 Ready to find your dream property?
        </p>
        <p className="text-sm text-slate-500 mt-1">
          Contact us today and let us help you make the right move.
        </p>
      </div>
    </section>
  );
};

export default About;