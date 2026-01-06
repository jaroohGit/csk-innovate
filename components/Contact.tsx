export default function Contact() {
  return (
    <section id="contact" className="relative py-24 bg-gradient-to-br from-[#0a0a0a] via-background to-[#0d0d0d]">
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-accent/10 to-purple-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 to-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">Let&apos;s Talk</h2>
            <p className="text-xl text-gray-400 mb-12">Ready to transform your operations? Get in touch with our team for a free consultation.</p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium mb-1">Email</div>
                  <a href="mailto:info@cskinnovate.com" className="text-gray-400 hover:text-accent transition-colors">info@cskinnovate.com</a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium mb-1">Location</div>
                  <div className="text-gray-400">Bangkok, Thailand</div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium mb-1">Business Hours</div>
                  <div className="text-gray-400">Mon-Fri: 9:00 AM - 6:00 PM (ICT)</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl border border-white/10 p-8 lg:p-10">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2">Name *</label>
                <input type="text" id="name" required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-all" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-white mb-2">Email *</label>
                <input type="email" id="email" required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-all" placeholder="your@email.com" />
              </div>
              <div>
                <label htmlFor="company" className="block text-white mb-2">Company</label>
                <input type="text" id="company" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-all" placeholder="Your company name" />
              </div>
              <div>
                <label htmlFor="message" className="block text-white mb-2">Message *</label>
                <textarea id="message" required rows={5} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-all resize-none" placeholder="Tell us about your project..."></textarea>
              </div>
              <button type="submit" className="w-full px-8 py-4 bg-accent text-white rounded-full font-medium hover:bg-accent/90 transition-all">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}