"use client";
import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';

const SupportPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you will receive an email with the tracking number and a link to track your package directly through our courier partner's website."
    },
    {
      question: "What is the return policy for sweets and savouries?",
      answer: "Due to the perishable nature of our products, we do not accept returns. However, if you receive a damaged or incorrect item, please contact us within 24 hours of delivery."
    },
    {
      question: "Are your products available for international shipping?",
      answer: "Currently, we ship across India. For international bulk inquiries, please contact our corporate team using the 'Corporate' button in the header."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-10 py-12">
        <h1 className="text-3xl font-serif text-[#711A2E] mb-8 uppercase tracking-widest">Customer Support</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* 1. Contact Methods */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-gray-50 p-6 rounded-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6 uppercase">Contact Us</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#7F5B98] p-2 rounded-md text-white">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Call Us</p>
                    <p className="text-sm text-gray-800">+91 1234567890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#7F5B98] p-2 rounded-md text-white">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Email Us</p>
                    <p className="text-sm text-gray-800">support@haldirams.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#7F5B98] p-2 rounded-md text-white">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">WhatsApp</p>
                    <p className="text-sm text-gray-800">+91 9876543210</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 border rounded-sm shadow-sm">
              <h2 className="text-sm font-bold text-[#711A2E] uppercase mb-2">Operating Hours</h2>
              <p className="text-xs text-gray-600">Mon - Sat: 9:00 AM to 7:00 PM</p>
              <p className="text-xs text-gray-600 mt-1">Sunday: Closed</p>
            </div>
          </div>

          {/* 2. Contact Form & FAQs */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* FAQs Section */}
            <section>
              <h2 className="text-[20px] font-serif tracking-widest text-gray-800 uppercase mb-6 border-b pb-2">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-100 rounded-md overflow-hidden">
                    <button 
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm font-bold text-gray-800">{faq.question}</span>
                      {openFaq === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    {openFaq === index && (
                      <div className="p-4 bg-gray-50 text-sm text-gray-600 animate-in slide-in-from-top-1">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Raise a Ticket Form */}
            <section className="bg-white p-8 border rounded-sm shadow-sm">
              <h2 className="text-[20px] font-serif tracking-widest text-gray-800 uppercase mb-6">Raise a Support Ticket</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-700 uppercase">Order ID</label>
                    <input type="text" placeholder="#12345" className="border border-orange-200 rounded-md p-2.5 outline-none focus:border-[#7F5B98]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-700 uppercase">Subject</label>
                    <select className="border border-orange-200 rounded-md p-2.5 outline-none focus:border-[#7F5B98] bg-white">
                      <option>Delivery Issue</option>
                      <option>Product Quality</option>
                      <option>Refund Request</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-700 uppercase">Message</label>
                  <textarea rows={4} placeholder="How can we help you?" className="border border-orange-200 rounded-md p-2.5 outline-none focus:border-[#7F5B98] resize-none" />
                </div>
                <button className="bg-[#DA0428] text-white px-8 py-3 rounded-md font-bold hover:bg-red-700 transition-all uppercase tracking-widest text-sm w-full md:w-auto">
                  Submit Ticket
                </button>
              </form>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;