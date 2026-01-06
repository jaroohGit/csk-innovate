export default function Solutions() {
  const solutions = [
    {
      title: "Industrial IIoT",
      description: "Connect, monitor, and control all your industrial assets from a single platform.",
      items: ["Sensor Integration", "Edge Computing", "Cloud Connectivity", "Data Pipeline"],
      image: "/assets/iot-gateway.svg"
    },
    {
      title: "AI Analytics",
      description: "Leverage machine learning to predict failures, optimize processes, and reduce costs.",
      items: ["Predictive Maintenance", "Anomaly Detection", "Process Optimization", "Energy Efficiency"],
      image: "/assets/ai-brain.svg"
    },
    {
      title: "Operational Dashboards",
      description: "Real-time visualization of your entire operation with customizable KPIs and alerts.",
      items: ["Custom KPIs", "Real-time Alerts", "Historical Analysis", "Mobile Access"],
      image: "/assets/dashboard-graphs.svg"
    },
    {
      title: "OT/IT Integration",
      description: "Seamlessly bridge operational technology and information technology systems.",
      items: ["Protocol Translation", "Data Harmonization", "Security First", "Legacy Support"]
    }
  ];

  return (
    <section id="solutions" className="relative py-24 md:py-32 bg-gradient-to-br from-background via-[#0d0d0d] to-background overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute -top-1/4 right-1/3 w-[500px] h-[500px] bg-gradient-to-br from-accent/10 to-purple-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-1/4 left-1/3 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 to-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
            Our Solutions
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive industrial intelligence solutions designed for modern manufacturing
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {solutions.map((solution, index) => (
            <div 
              key={index} 
              className="group p-8 lg:p-10 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl border border-white/10 hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10"
            >
              {solution.image && (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <img src={solution.image} alt={solution.title} className="w-12 h-12" />
                </div>
              )}
              <h3 className="text-2xl font-medium text-white mb-4">{solution.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{solution.description}</p>
              <ul className="space-y-3">
                {solution.items.map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 text-accent mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}