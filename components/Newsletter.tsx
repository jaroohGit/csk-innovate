export default function Newsletter() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] overflow-hidden">
      {/* Radial Gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-accent/10 via-purple-500/10 to-blue-500/10 rounded-full blur-[150px] opacity-50"></div>
      </div>
      
      {/* Dot Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Stay Updated</h2>
        <p className="text-xl text-gray-400 mb-8">Get the latest insights on IIoT, AI, and industrial automation delivered to your inbox</p>
        <form className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input type="email" placeholder="Enter your email" required className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-all" />
            <button type="submit" className="px-8 py-4 bg-accent text-white rounded-full font-medium hover:bg-accent/90 transition-all whitespace-nowrap">Subscribe</button>
          </div>
        </form>
        <p className="mt-6 text-sm text-gray-500">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}