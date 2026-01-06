export default function Blog() {
  const posts = [
    { category: "IIoT", date: "Jan 3, 2026", read: "5 min read", title: "The Future of Industrial IoT in 2026", desc: "Explore how IIoT is transforming manufacturing operations and what trends to watch." },
    { category: "AI Analytics", date: "Dec 28, 2025", read: "7 min read", title: "AI-Driven Predictive Maintenance Success Stories", desc: "Real-world examples of how AI reduced downtime by 40% across multiple facilities." },
    { category: "Integration", date: "Dec 20, 2025", read: "6 min read", title: "Bridging OT and IT: A Practical Guide", desc: "Best practices for integrating operational and information technology systems securely." }
  ];

  return (
    <section id="blog" className="relative py-24 bg-gradient-to-b from-background to-[#0d0d0d]">
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-accent/5 via-transparent to-transparent"></div>
      </div>
      
      {/* Dot Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Latest Insights</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Industry trends, case studies, and technical deep-dives</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <article key={i} className="group cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-accent/20 to-purple-500/20 rounded-2xl mb-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-accent/90 text-white text-xs font-medium rounded-full">{post.category}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <span>{post.date}</span><span>•</span><span>{post.read}</span>
                </div>
                <h3 className="text-xl font-medium text-white group-hover:text-accent transition-colors">{post.title}</h3>
                <p className="text-gray-400 leading-relaxed">{post.desc}</p>
                <button className="text-accent hover:underline inline-flex items-center gap-2">
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="px-8 py-3 border border-white/30 text-white rounded-full hover:bg-white/10 transition-all">View All Articles</button>
        </div>
      </div>
    </section>
  );
}