import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I track user feature clicks?",
      answer: "Simply integrate our SDK into your application. When users click features, we automatically log and aggregate the data in your dashboard."
    },
    {
      question: "What analytics metrics are available?",
      answer: "We track feature clicks, user sessions, engagement rates, user demographics (age, gender), and conversion funnels in real-time."
    },
    {
      question: "How is the data updated?",
      answer: "All analytics are updated in real-time. You can see user interactions as they happen in your live dashboard."
    },
    {
      question: "Can I export my analytics data?",
      answer: "Yes, you can export analytics data in CSV or JSON format. Integrations with popular BI tools are also supported."
    },
    {
      question: "How secure is user data?",
      answer: "We use enterprise-grade encryption, GDPR compliance, and regular security audits to protect all user data."
    }
  ];

  return (
    <section className="py-16 bg-gray-50" id="faq">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center text-purple">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="card">
              <button
                className="w-full flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="text-base font-semibold text-left">{faq.question}</h3>
                <ChevronDown 
                  size={20} 
                  className={`transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              
              {openIndex === index && (
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
