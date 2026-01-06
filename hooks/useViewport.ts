'use client';
import { useState, useEffect } from 'react';

export interface ViewportSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isFoldCover: boolean;
  isFoldInner: boolean;
  deviceType: 'fold-cover' | 'fold-inner' | 'mobile' | 'tablet' | 'desktop';
}

export function useViewport(): ViewportSize {
  const [viewport, setViewport] = useState<ViewportSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isFoldCover: false,
    isFoldInner: false,
    deviceType: 'desktop',
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Define breakpoints optimized for Samsung Fold 5
      // Cover display: 904x2316px ≈ 412 CSS pixels width
      // Inner display: 1812x2176px ≈ 884 CSS pixels width
      const isFoldCover = width <= 420;
      const isFoldInner = width > 420 && width <= 880;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;
      
      let deviceType: ViewportSize['deviceType'] = 'desktop';
      if (isFoldCover) deviceType = 'fold-cover';
      else if (isFoldInner) deviceType = 'fold-inner';
      else if (isMobile) deviceType = 'mobile';
      else if (isTablet) deviceType = 'tablet';

      setViewport({
        width,
        height,
        isMobile,
        isTablet,
        isDesktop,
        isFoldCover,
        isFoldInner,
        deviceType,
      });

      // Log viewport for debugging (remove in production)
      console.log('[Viewport]', {
        width,
        height,
        deviceType,
        aspect: (width / height).toFixed(2),
        orientation: width > height ? 'landscape' : 'portrait',
        isFoldDevice: isFoldCover || isFoldInner,
      });
    };

    // Initial call
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return viewport;
}
