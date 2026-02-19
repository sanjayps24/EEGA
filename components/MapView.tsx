'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { useEmergencyStore } from '@/store/emergencyStore';

const MapInner = dynamic(() => import('./MapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold animate-pulse rounded-3xl">
      Loading Map Services...
    </div>
  ),
});

export const MapView: React.FC = () => {
  const userLocation = useEmergencyStore((state) => state.userLocation);

  return (
    <div className="w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-inner border-4 border-white">
      <MapInner location={userLocation} />
    </div>
  );
};
