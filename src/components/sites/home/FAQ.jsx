import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { fadeInUp } from "@/utils/animations";

const FAQ = () => {
  const faqData = [
    {
      question: "What is Omni Marketplace?",
      answer:
        "Omni Marketplace is a structured advertising placement marketplace where advertisers can find and book specific media slots directly from hosts across global channels.",
    },
    {
      question: "How do I start as an advertiser?",
      answer:
        "Simply browse our placements, select the ones that fit your campaign goals, and book them directly through our secure platform.",
    },
    {
      question: "Can I host my own advertising space?",
      answer:
        "Yes! If you have an audience or a physical/digital space that can host advertisements, you can join as a host and list your placements for advertisers to book.",
    },
    {
      question: "Are the placements verified?",
      answer:
        "We maintain a rigorous verification process for all our hosts and their listings to ensure transparency and reliability for every transaction.",
    },
   {
  question: "What payment methods are supported?",
  answer:
    "We accept payments through Stripe, which supports major debit and credit cards. All transactions are processed securely through our payment system.",
}
  ];

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
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-100 last:border-none py-2">
                <AccordionTrigger className="text-lg md:text-xl font-medium text-[#171717] font-host-grotesk hover:no-underline hover:text-Primary transition-colors py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#525866] text-base md:text-lg font-normal font-host-grotesk leading-relaxed pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;