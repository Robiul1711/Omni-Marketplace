import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { fadeInUp } from "@/utils/animations";
import useClient from "@/hooks/useClient";

const FAQSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="border-b border-gray-100 py-6 flex items-center justify-between"
        >
          <div className="h-6 bg-gray-200 rounded-lg w-2/3" />
          <div className="w-5 h-5 bg-gray-200 rounded-full" />
        </div>
      ))}
    </div>
  );
};

const fallbackFaqData = [
  {
    id: 1,
    question: "What is Omni Marketplace?",
    answer:
      "Omni Marketplace is a structured advertising placement marketplace where advertisers can find and book specific media slots directly from hosts across global channels.",
  },
  {
    id: 2,
    question: "How do I start as an advertiser?",
    answer:
      "Simply browse our placements, select the ones that fit your campaign goals, and book them directly through our secure platform.",
  },
  {
    id: 3,
    question: "Can I host my own advertising space?",
    answer:
      "Yes! If you have an audience or a physical/digital space that can host advertisements, you can join as a host and list your placements for advertisers to book.",
  },
  {
    id: 4,
    question: "How do I create a placement as a host?",
    answer:
      'Visit your Host Dashboard, click "Create Placement", fill in the details (format, size, duration, price), and submit for approval.',
  },
  {
    id: 5,
    question: "Are the placements verified?",
    answer:
      "We maintain a rigorous verification process for all our hosts and their listings to ensure transparency and reliability for every transaction.",
  },
  {
    id: 6,
    question: "What payment methods are supported?",
    answer:
      "We accept payments through Stripe, which supports major debit and credit cards. All transactions are processed securely through our payment system.",
  },
];

const FAQ = () => {
  const { data, isLoading } = useClient({
    queryKey: ["faqs"],
    url: "/faqs",
    isPrivate: false,
  });

  const apiFaqs = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data)
    ? data
    : null;
  const faqsToDisplay =
    apiFaqs && apiFaqs.length > 0 ? apiFaqs : fallbackFaqData;

  return (
    <section className="section-padding-x bg-white">
      <div className="max-w-[1000px] mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-[32px] md:text-[48px] font-medium text-[#171717] font-host-grotesk mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-[#525866] text-base md:text-lg font-normal font-host-grotesk max-w-[600px] mx-auto">
            Everything you need to know about Omni Marketplace and how it works.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {isLoading ? (
            <FAQSkeleton />
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {faqsToDisplay.map((item, index) => (
                <AccordionItem
                  key={item.id || index}
                  value={`item-${item.id || index}`}
                  className="border-b border-gray-100 last:border-none py-2"
                >
                  <AccordionTrigger className="text-lg md:text-xl font-medium text-[#171717] font-host-grotesk hover:no-underline hover:text-Primary transition-colors py-6 text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#525866] text-base md:text-lg font-normal font-host-grotesk leading-relaxed pb-6">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;