import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/utils/animations";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/ui/Button";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const ContactUs = () => {
    return (
        <div className="bg-white min-h-screen mt-20">
            {/* Hero Section */}
            <section className="section-padding-x py-20 bg-gray-50/50">
                <div className="max-w-[1000px] mx-auto text-center">
                    <motion.div
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                    >
                        <h1 className="text-[32px] md:text-[64px] font-medium text-[#171717] font-host-grotesk mb-4 md:mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-base md:text-xl font-normal font-host-grotesk max-w-[700px] mx-auto leading-relaxed">
                            Have questions about Omni Marketplace? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Content */}
            <section className="section-padding-x lg:py-24 py-10">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20 gap-8">
                        {/* Contact Information */}
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            className="space-y-8 md:space-y-12"
                        >
                            <div>
                                <h2 className="text-2xl md:text-3xl font-medium text-[#171717] font-host-grotesk mb-4 md:mb-8">
                                    Contact Information
                                </h2>
                                <p className="text-[#525866] text-base md:text-lg font-normal font-host-grotesk leading-relaxed mb-6 md:mb-10">
                                    Feel free to contact us through any of these channels. Our team is always ready to assist you.
                                </p>
                            </div>

                            <div className="space-y-6 md:space-y-8">
                                <div className="flex items-start gap-4 md:gap-5">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-Primary/10 rounded-xl flex items-center justify-center text-Primary shrink-0">
                                        <FiMail className="size-5 md:size-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg md:text-xl font-medium text-[#171717] font-host-grotesk mb-1">Email Us</h4>
                                        <p className="text-base md:text-lg text-[#525866] font-normal font-host-grotesk">support@omnimarketplace.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 md:gap-5">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-Primary/10 rounded-xl flex items-center justify-center text-Primary shrink-0">
                                        <FiPhone className="size-5 md:size-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg md:text-xl font-medium text-[#171717] font-host-grotesk mb-1">Call Us</h4>
                                        <p className="text-base md:text-lg text-[#525866] font-normal font-host-grotesk">+1 (555) 000-0000</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            variants={fadeInUp}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl border border-gray-100 p-6 md:p-12 shadow-xl shadow-gray-100/50"
                        >
                            <form className="space-y-4 md:space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <div className="space-y-1.5 md:space-y-2">
                                        <label className="text-xs md:text-sm font-medium text-[#171717] font-host-grotesk ml-1">First Name</label>
                                        <Input placeholder="John" className="h-12 md:h-14 px-4 md:px-5 rounded-xl border-gray-200 focus:border-Primary" />
                                    </div>
                                    <div className="space-y-1.5 md:space-y-2">
                                        <label className="text-xs md:text-sm font-medium text-[#171717] font-host-grotesk ml-1">Last Name</label>
                                        <Input placeholder="Doe" className="h-12 md:h-14 px-4 md:px-5 rounded-xl border-gray-200 focus:border-Primary" />
                                    </div>
                                </div>

                                <div className="space-y-1.5 md:space-y-2">
                                    <label className="text-xs md:text-sm font-medium text-[#171717] font-host-grotesk ml-1">Email Address</label>
                                    <Input type="email" placeholder="john@example.com" className="h-12 md:h-14 px-4 md:px-5 rounded-xl border-gray-200 focus:border-Primary" />
                                </div>

                                <div className="space-y-1.5 md:space-y-2">
                                    <label className="text-xs md:text-sm font-medium text-[#171717] font-host-grotesk ml-1">Subject</label>
                                    <Input placeholder="How can we help?" className="h-12 md:h-14 px-4 md:px-5 rounded-xl border-gray-200 focus:border-Primary" />
                                </div>

                                <div className="space-y-1.5 md:space-y-2">
                                    <label className="text-xs md:text-sm font-medium text-[#171717] font-host-grotesk ml-1">Message</label>
                                    <Textarea placeholder="Tell us more about your inquiry..." className="min-h-24 md:min-h-32 p-4 md:p-5 rounded-xl border-gray-200 focus:border-Primary" />
                                </div>

                                <Button className="w-full bg-Primary text-white hover:bg-Primary/90 h-12 md:h-14 rounded-xl text-base md:text-lg font-semibold mt-2 md:mt-4">
                                    Send Message
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;