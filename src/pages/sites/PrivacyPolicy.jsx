import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import ReadyStarted from '@/components/sites/home/ReadyStarted';

const PrivacyPolicy = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="section-padding-x section-padding-y mt-28 md:mt-10">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold font-host-grotesk text-[#171717] mb-8"
          >
            Privacy Policy
          </motion.h1>
          
          <motion.div variants={fadeInUp} className="max-w-none text-[#525866] font-host-grotesk space-y-10">
            <p className="text-xl leading-relaxed text-[#525866]">
              Last updated: April 16, 2026
            </p>

            <section>
              <h2 className="text-2xl font-bold text-[#171717] mt-10 mb-4">1. Information We Collect</h2>
              <p className="text-lg leading-relaxed">
                We collect information that you provide directly to us when you create an account, use our services, or communicate with us. This may include your name, email address, payment information, and any advertising content you upload.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#171717] mt-10 mb-4">2. How We Use Your Information</h2>
              <p className="text-lg leading-relaxed">
                We use the information we collect to provide, maintain, and improve our services, to process transactions, and to communicate with you about your account and our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#171717] mt-10 mb-4">3. Information Sharing</h2>
              <p className="text-lg leading-relaxed">
                We do not share your personal information with third parties except as described in this policy. We may share information with service providers who perform services on our behalf, or when required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#171717] mt-10 mb-4">4. Data Security</h2>
              <p className="text-lg leading-relaxed">
                We implement reasonable security measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#171717] mt-10 mb-4">5. Cookies and Tracking</h2>
              <p className="text-lg leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#171717] mt-10 mb-4">6. Your Rights</h2>
              <p className="text-lg leading-relaxed">
                Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#171717] mt-10 mb-4">7. Changes to This Policy</h2>
              <p className="text-lg leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#171717] mt-10 mb-4">8. Contact Us</h2>
              <p className="text-lg leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at <span className="text-Primary">privacy@omnimarketplace.com</span>.
              </p>
            </section>
          </motion.div>
        </motion.div>
      </div>
      <ReadyStarted />
    </div>
  );
};

export default PrivacyPolicy;
