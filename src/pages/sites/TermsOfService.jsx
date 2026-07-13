import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import ReadyStarted from '@/components/sites/home/ReadyStarted';
import useClient from '@/hooks/useClient';

const TermsOfService = () => {
  const { data: termsCmsData } = useClient({
    queryKey: ["termsOfServiceCms"],
    url: "/cms-pages/terms-of-service",
  });

  const pageTitle = termsCmsData?.data?.title || "Terms of Service";
  const lastUpdated = termsCmsData?.data?.content?.last_updated || "2026-04-16";
  const description = termsCmsData?.data?.content?.description;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

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
            {pageTitle}
          </motion.h1>
          
          <motion.div variants={fadeInUp} className="max-w-none text-[#525866] font-host-grotesk space-y-10">
            <p className="text-xl leading-relaxed text-[#525866]">
              Last updated: {formatDate(lastUpdated)}
            </p>

            {description ? (
              <div
                dangerouslySetInnerHTML={{ __html: description }}
                className="[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#171717] [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:text-lg [&_p]:leading-relaxed [&_p]:mb-4 [&_span]:text-Primary"
              />
            ) : (
              <>
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
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
      <ReadyStarted />
    </div>
  );
};

export default TermsOfService;
