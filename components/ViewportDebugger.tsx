'use client';
import { useViewport } from '@/hooks/useViewport';

export default function ViewportDebugger() {
  const viewport = useViewport();

  // Only show in development
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed bottom-4 left-4 z-[999] bg-black/90 text-white text-xs px-3 py-2 rounded-lg border border-white/20 font-mono">
      <div className="flex flex-col gap-1">
        <div>
          <span className="text-gray-400">Size:</span> {viewport.width} × {viewport.height}
        </div>
        <div>
          <span className="text-gray-400">Device:</span>{' '}
          <span className={
            viewport.isFoldCover ? 'text-yellow-400' : 
            viewport.isFoldInner ? 'text-orange-400' :
            viewport.isMobile ? 'text-blue-400' : 
            viewport.isTablet ? 'text-green-400' : 'text-purple-400'
          }>
            {viewport.deviceType}
          </span>
        </div>
        <div>
          <span className="text-gray-400">Aspect:</span> {(viewport.width / viewport.height).toFixed(2)}
        </div>
        <div>
          <span className="text-gray-400">Orient:</span>{' '}
          {viewport.width > viewport.height ? '🔄 landscape' : '📱 portrait'}
        </div>
      </div>
    </div>
  );
}
