import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const faqs = [
    {
      question: 'What is this analytics dashboard?',
      answer:
        'It\'s an interactive product analytics platform that tracks user interactions with the dashboard itself. Every filter change, chart click, and action is recorded and visualized, creating a self-referential analytics experience.',
    },
    {
      question: 'How do I get started?',
      answer:
        'Click the "Get Started" button to access the dashboard. You can register a new account or use a test account. Once logged in, you\'ll see interactive charts and filters to explore.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'Yes! We use JWT authentication with bcrypt password hashing. All passwords are securely hashed before storage, and authentication is required to access the dashboard.',
    },
    {
      question: 'Can I filter the data?',
      answer:
        'Absolutely! You can filter by date range, age group (<18, 18-40, >40), and gender. Your filter preferences are saved in cookies and automatically reload when you return.',
    },
    {
      question: 'What happens when I click a bar in the chart?',
      answer:
        'Clicking a bar selects that feature and updates the line chart to show the time trend for that specific feature. The interaction is also tracked and saved.',
    },
    {
      question: 'Are interactions really being tracked?',
      answer:
        'Yes! Every interaction with filters and charts is tracked in real-time. Over time, you\'ll see the dashboard\'s own usage patterns appear in the analytics.',
    },
    {
      question: 'How do I test the platform?',
      answer:
        'Use the test credentials: Username: john_doe, Password: password123. Log in to see a pre-populated dashboard with 150+ real interactions. Change filters, click bars, and watch your actions get tracked!',
    },
    {
      question: 'What technology is used?',
      answer:
        'Frontend: React + Vite + Tailwind CSS + Recharts. Backend: Node.js + Express + PostgreSQL + Sequelize ORM. Everything is built for performance and scalability.',
    },
  ];

  return (
    <section id="faq" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about the platform
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-violet-300 transition-colors"
            >
              {/* Question */}
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 text-left">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-violet-600 transition-transform flex-shrink-0 ml-4 ${
                    expandedIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Answer */}
              {expandedIndex === index && (
                <div className="px-6 py-5 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Testing Guide */}
        <div className="mt-16 bg-gradient-to-br from-violet-50 to-amber-50 rounded-2xl p-10 border border-violet-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">🚀 How to Test the Platform</h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Quick Start */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">⚡</span> Quick Start
              </h4>
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <p className="font-medium mb-1">1. Login with test credentials:</p>
                  <code className="bg-white px-3 py-1 rounded border border-gray-200 text-xs">
                    john_doe / password123
                  </code>
                </div>
                <div>
                  <p className="font-medium mb-1">2. Or register a new account:</p>
                  <p>Go to Register, fill in details, and create an account</p>
                </div>
                <div>
                  <p className="font-medium mb-1">3. Explore the dashboard:</p>
                  <p>You'll see 150+ pre-loaded interactions</p>
                </div>
              </div>
            </div>

            {/* Things to Try */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🎯</span> Things to Try
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Change the date range filter</li>
                <li>✓ Select an age group (18-40, etc.)</li>
                <li>✓ Choose a gender</li>
                <li>✓ Click bars to see trends</li>
                <li>✓ Refresh the page (filters persist!)</li>
                <li>✓ Click Reset to clear filters</li>
              </ul>
            </div>
          </div>

          {/* Pro Tips */}
          <div className="mt-6 p-4 bg-white rounded-lg border border-violet-200">
            <p className="font-semibold text-gray-900 mb-3">💡 Pro Tips:</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Your interactions are being tracked! Come back later to see your actions in the analytics</li>
              <li>• Try registering multiple accounts to see how data aggregates</li>
              <li>• Filters are saved in browser cookies - they'll persist even after closing the browser</li>
              <li>• The line chart updates based on which bar you click in the feature usage chart</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}