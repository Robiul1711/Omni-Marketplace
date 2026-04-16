import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import ReadyStarted from '@/components/sites/home/ReadyStarted';

const TermsOfService = () => {
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
            Terms of Service
          </motion.h1>
          
          <motion.div variants={fadeInUp} className="max-w-none text-[#525866] font-host-grotesk space-y-10">
            <p className="text-xl leading-relaxed text-[#525866]">
              Last updated: April 16, 2026
            </p>

            <section>
              <h2 className="text-2xl font-bold text-[#171717] mt-10 mb-4">1. Acceptance of Terms</h2>
              <p className="text-lg leading-relaxed">
                By accessing and using Omni Marketplace, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#171717] mt-10 mb-4">2. Description of Service</h2>
              <p className="text-lg leading-relaxed">
                Omni Marketplace provides a platform connecting advertisers with hosts for structured advertising placements. We facilitate the discovery, booking, and management of advertising spaces.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#171717] mt-10 mb-4">3. User Obligations</h2>
              <p className="text-lg leading-relaxed">
                Users are responsible for maintaining the confidentiality of their accounts and for all activities that occur under their account. You must provide accurate and complete information when creating an account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#171717] mt-10 mb-4">4. Content Guidelines</h2>
              <p className="text-lg leading-relaxed">
                All advertising content must comply with our community standards and local laws. We reserve the right to remove any content that violates these terms or is deemed inappropriate at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#171717] mt-10 mb-4">5. Intellectual Property</h2>
              <p className="text-lg leading-relaxed">
                The Omni Marketplace platform, including its original content, features, and functionality, are and will remain the exclusive property of Omni Marketplace and its licensors.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#171717] mt-10 mb-4">6. Limitation of Liability</h2>
              <p className="text-lg leading-relaxed">
                Omni Marketplace shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#171717] mt-10 mb-4">7. Changes to Terms</h2>
              <p className="text-lg leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of any significant changes by posting the new terms on this site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#171717] mt-10 mb-4">8. Contact Us</h2>
              <p className="text-lg leading-relaxed">
                If you have any questions about these Terms, please contact us at <span className="text-Primary">legal@omnimarketplace.com</span>.
              </p>
            </section>
          </motion.div>
        </motion.div>
      </div>
      <ReadyStarted />
    </div>
  );
};

export default TermsOfService;
