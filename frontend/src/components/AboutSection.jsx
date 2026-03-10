import { BarChart3, TrendingUp, Lock, Zap } from 'lucide-react';

export default function AboutSection() {
  const features = [
    {
      icon: BarChart3,
      title: 'Interactive Analytics',
      description:
        'View feature usage through beautiful, interactive bar and line charts. Click any bar to see detailed time trends.',
      color: 'from-violet-600 to-violet-400',
    },
    {
      icon: TrendingUp,
      title: 'Self-Tracking Dashboard',
      description:
        'The dashboard tracks its own usage. Every filter change and chart click is recorded and visualized, creating a self-referential analytics loop.',
      color: 'from-amber-600 to-amber-400',
    },
    {
      icon: Lock,
      title: 'Secure Authentication',
      description:
        'Enterprise-grade JWT authentication with bcrypt password hashing. Your data is encrypted and secure.',
      color: 'from-emerald-600 to-emerald-400',
    },
    {
      icon: Zap,
      title: 'Real-Time Filtering',
      description:
        'Filter data by date range, age group, and gender. All filters persist in cookies and load automatically on refresh.',
      color: 'from-red-600 to-red-400',
    },
  ];

  return (
    <section id="about" className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to understand and track user behavior in real-time
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-violet-200 group"
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.color} p-3 mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-full h-full text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h3>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Steps */}
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-violet-100">
                    <span className="text-lg font-bold text-violet-600">1</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Register & Login</h4>
                  <p className="text-gray-600">
                    Create a secure account with your age and gender information for personalized analytics.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-amber-100">
                    <span className="text-lg font-bold text-amber-600">2</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Apply Filters</h4>
                  <p className="text-gray-600">
                    Use date range, age group, and gender filters to narrow down the data you want to analyze.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-100">
                    <span className="text-lg font-bold text-emerald-600">3</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Interact & Explore</h4>
                  <p className="text-gray-600">
                    Click bars in the chart, change filters, and watch as your interactions are tracked in real-time.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-red-100">
                    <span className="text-lg font-bold text-red-600">4</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">See the Analytics</h4>
                  <p className="text-gray-600">
                    Watch the dashboard visualize its own usage as it learns from your interactions.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Chart Visualization */}
            <div className="bg-gradient-to-br from-violet-50 to-amber-50 rounded-xl p-8">
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">Feature Usage</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 bg-violet-600 rounded-full" style={{ width: '45%' }} />
                      <span className="text-sm text-gray-600">Date Picker</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 bg-amber-600 rounded-full" style={{ width: '38%' }} />
                      <span className="text-sm text-gray-600">Filter Age</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 bg-emerald-600 rounded-full" style={{ width: '32%' }} />
                      <span className="text-sm text-gray-600">Chart Click</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 bg-red-600 rounded-full" style={{ width: '28%' }} />
                      <span className="text-sm text-gray-600">Export Data</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm font-semibold text-gray-600 mb-4">Time Trend</p>
                  <div className="bg-white rounded-lg p-4">
                    <div className="h-24 flex items-end gap-1">
                      {[20, 25, 18, 30, 22, 28, 25, 20, 32, 27, 25, 30].map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-violet-600 to-violet-400 rounded-t opacity-70 hover:opacity-100 transition-opacity"
                          style={{ height: `${(height / 32) * 100}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Jan</span>
                      <span>Jun</span>
                      <span>Aug</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}