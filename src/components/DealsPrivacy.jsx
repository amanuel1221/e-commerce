import React from "react";

const DealsPrivacy = () => {
  const deals = [
    { title: "Electronics Weekend Sale", desc: "Up to 50% off all electronics this weekend!" },
    { title: "Clothing BOGO", desc: "Buy 2 get 1 free on selected clothing items." },
    { title: "Newsletter Discount", desc: "Subscribe to get 10% off your first purchase." },
    { title: "Free Shipping", desc: "Enjoy free shipping on orders over $75." },
    { title: "Holiday Specials", desc: "Exclusive holiday deals available now." },
    
    { title: "New User Offer", desc: "New users get an extra 15% off on their first order." },
    {title:" delivery days", desc:"Get your orders delivered within 20 business days."},
    { title: "Loyalty Program", desc: "Join our loyalty program for exclusive perks and discounts." },
    { title: "Flash Sales", desc: "Limited-time flash sales every Friday!" },
    { title: "Student Discount", desc: "Students get 10% off with a valid ID." },
    { title: "Referral Bonus", desc: "Refer a friend and both get $10 off your next purchase." },
    { }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Deals & Privacy</h1>

      {/* Deals Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {deals.map((deal, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-2">{deal.title}</h2>
            <p className="text-gray-700">{deal.desc}</p>
          </div>
        ))}
      </div>

      {/* Privacy Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">Privacy Policy</h2>
        <p className="text-gray-700 mb-2">
          We respect your privacy. Any information you provide is safe with us and will not be shared
          with third parties.
        </p>
        <p className="text-gray-700">
          By using our website, you agree to our Terms & Conditions and Privacy Policy. We are
          committed to protecting your personal data.
        </p>
      </div>
    </div>
  );
};

export default DealsPrivacy;
