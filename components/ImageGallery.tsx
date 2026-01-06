import Image from 'next/image'

const images = [
  { src: '/assets/iot-gateway.svg', alt: 'Industrial IoT Gateway', caption: 'Edge-ready IIoT Gateway with secure MQTT / OPC-UA' },
  { src: '/assets/ai-brain.svg', alt: 'AI Core', caption: 'AI Core for predictive vision, anomaly, and maintenance' },
  { src: '/assets/dashboard-graphs.svg', alt: 'Control Tower Dashboard', caption: 'Operations Control Tower with real-time KPIs' },
];

export default function ImageGallery() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#111111] via-[#0d0d0d] to-[#0a0a0a] overflow-hidden">
      {/* Gradient Mesh */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-transparent rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/3 right-0 w-[600px] h-[600px] bg-gradient-to-l from-accent/10 to-transparent rounded-full blur-[150px]"></div>
      </div>
      
      {/* Diagonal Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255, 255, 255, 0.05) 40px, rgba(255, 255, 255, 0.05) 41px)'
      }}></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Visual Story</h2>
          <p className="text-gray-400 text-xl">Edge connectivity, AI intelligence, and a control tower for industrial decisions</p>
        </div>
        <div className="grid grid-cols-1 fold:grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {images.map((img) => (
            <figure key={img.src} className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 p-4">
              <div className="relative w-full aspect-[4/3] fold-cover:aspect-[3/2] fold-inner:aspect-[4/3] md:aspect-[4/3] max-h-[50vh] fold-cover:max-h-[45vh] fold-inner:max-h-[55vh] md:max-h-none flex items-center justify-center bg-gradient-to-br from-cyan-500/10 to-amber-500/10 rounded-xl p-4 md:p-6 border border-cyan-500/20">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 430px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={false}
                  className="object-contain drop-shadow-2xl brightness-110 contrast-105 md:brightness-125 md:contrast-110"
                />
              </div>
              <figcaption className="mt-4 text-center text-gray-300">{img.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}