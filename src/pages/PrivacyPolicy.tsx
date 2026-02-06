import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
        <div className="prose lg:prose-xl mx-auto text-gray-700">
          <p>
            This is a placeholder for your Privacy Policy. In a real application, you would detail how you collect, use, and protect your users' data.
          </p>
          <h2>Information We Collect</h2>
          <p>
            When you use our contact forms or KPR calculator, we may collect personal information such as your name, email address, and phone number.
          </p>
          <h2>How We Use Your Information</h2>
          <p>
            The information we collect is used to respond to your inquiries, provide you with information about our properties, and improve our services. We do not sell or rent your personal information to third parties.
          </p>
          <h2>Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information.
          </p>
          <h2>Your Consent</h2>
          <p>
            By using our site, you consent to our web site privacy policy.
          </p>
          <h2>Changes to our Privacy Policy</h2>
          <p>
            If we decide to change our privacy policy, we will post those changes on this page. This policy was last modified on {new Date().toLocaleDateString()}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
