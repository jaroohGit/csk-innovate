export default function UseCases() {
  const cases = [
    { metric: "↑ 25%", label: "Average OEE Increase", title: "OEE Optimization", desc: "Maximize Overall Equipment Effectiveness with real-time monitoring and AI-driven insights." },
    { metric: "↓ 30%", label: "Energy Cost Reduction", title: "Energy Management", desc: "Reduce energy consumption and costs with intelligent monitoring and optimization." },
    { metric: "↓ 40%", label: "Downtime Reduction", title: "Predictive Maintenance", desc: "Prevent unplanned downtime by predicting equipment failures before they happen." },
    { metric: "↑ 99.5%", label: "Quality Rate", title: "Quality Control", desc: "Ensure product quality with real-time monitoring and automated defect detection." },
    { metric: "↓ 20%", label: "Utility Waste Reduction", title: "Utilities Monitoring", desc: "Track and optimize water, compressed air, and other utility consumption." }
  ];

  return (
    <section id="use-cases" className="relative py-24 bg-gradient-to-b from-[#111111] via-[#0d0d0d] to-background overflow-hidden">
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-accent/15 to-transparent rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-blue-500/15 to-transparent rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {/* Grid Lines */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Use Cases</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Proven results across industries and applications</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <div key={i} className="group p-8 bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/10 hover:border-accent/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="mb-6">
                <div className="text-3xl font-bold text-accent mb-1">{c.metric}</div>
                <div className="text-sm text-gray-500">{c.label}</div>
              </div>
              <h3 className="text-xl font-medium text-white mb-3">{c.title}</h3>
              <p className="text-gray-400 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}