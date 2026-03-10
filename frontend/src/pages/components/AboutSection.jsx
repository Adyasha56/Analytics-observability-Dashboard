export default function AboutSection() {
  return (
    <section className="py-20 bg-gray-50" id="about">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-purple">About Us</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Real-time Insights</h3>
            <p className="text-sm text-gray-600">
              Get instant insights into user behavior and feature adoption with our comprehensive analytics platform.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Easy Integration</h3>
            <p className="text-sm text-gray-600">
              Simple APIs and webhooks to integrate with your existing products and workflows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
