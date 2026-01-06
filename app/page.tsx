import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import WhatWeDo from '@/components/WhatWeDo';
import Solutions from '@/components/Solutions';
import UseCases from '@/components/UseCases';
import ImageGallery from '@/components/ImageGallery';
import Blog from '@/components/Blog';
import Newsletter from '@/components/Newsletter';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ViewportDebugger from '@/components/ViewportDebugger';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <WhatWeDo />
      <Solutions />
      <UseCases />
      <ImageGallery />
      <Blog />
      <Newsletter />
      <Contact />
      <Footer />
      <ViewportDebugger />
    </main>
  );
}
