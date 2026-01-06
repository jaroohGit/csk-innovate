export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-[#0d0d0d] to-background">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="inline-block">
            <span className="px-4 py-2 text-sm font-medium text-accent bg-accent/10 border border-accent/20 rounded-full">
              Industrial IoT & AI Solutions
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-tight">
            The New Standard
            <br />
            <span className="font-bold bg-gradient-to-r from-accent via-orange-500 to-red-500 bg-clip-text text-transparent">
              in Industrial Intelligence
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Use IIoT and AI to gain real-time, 360-degree visibility across your operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a href="#contact" className="px-8 py-4 bg-accent text-white rounded-full text-lg font-medium hover:bg-accent/90 transition-all transform hover:scale-105 shadow-lg shadow-accent/25">
              Learn More
            </a>
            <a href="#solutions" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full text-lg font-medium hover:bg-white/20 transition-all border border-white/20">
              Watch Demo
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}