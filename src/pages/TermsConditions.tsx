import React from 'react';
import { useTranslation } from 'react-i18next';

const TermsConditions: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8">{t('legal.terms_conditions')}</h1>
        <div className="prose lg:prose-xl mx-auto text-gray-700">
          <h2>1. Introduction</h2>
          <p>
            Welcome to Khaya Landmark. These are the terms and conditions governing your access to and use of the website Khaya Landmark and its sub-domains, sites, services and tools.
          </p>
          <h2>2. User Agreement</h2>
          <p>
            By using the Site, you hereby accept these terms and conditions and represent that you agree to comply with these terms and conditions. This User Agreement is deemed effective upon your use of the Site which signifies your acceptance of these terms.
          </p>
          <h2>3. Copyright</h2>
          <p>
            All content included on the Site, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property and copyright work of either Khaya Landmark, its users, its content suppliers or its licensors and is protected by copyright, trademarks, patents or other intellectual property rights and laws.
          </p>
          <h2>4. Disclaimer</h2>
          <p>
            The information on this website is provided "as is" without any representations or warranties, express or implied. Khaya Landmark makes no representations or warranties in relation to the information and materials provided on this website. The KPR Calculator is for estimation purposes only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
