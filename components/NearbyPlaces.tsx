'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useEmergencyStore, NearbyPlace } from '@/store/emergencyStore';
import { MapPin, Phone, ExternalLink, Loader2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock API logic for nearby emergency services
const fetchPlaces = async (lat: number, lng: number, type: string): Promise<NearbyPlace[]> => {
  // Simulating an API call with axios
  // In a real app, this would be: await axios.get(`/api/places?lat=${lat}&lng=${lng}&type=${type}`)
  
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay

  const mockData: Record<string, NearbyPlace[]> = {
    Medical: [
      { id: '1', name: 'City Hospital', type: 'Hospital', vicinity: '123 Health St, Metro City', location: { lat: lat + 0.002, lng: lng + 0.001 } },
      { id: '2', name: 'Emergency Clinic Plus', type: 'Clinic', vicinity: '456 Urgent Care Rd', location: { lat: lat - 0.001, lng: lng + 0.003 } },
    ],
    Fire: [
      { id: '3', name: 'Central Fire Station', type: 'Fire Station', vicinity: '789 Rescue Blvd', location: { lat: lat + 0.005, lng: lng - 0.002 } },
    ],
    Police: [
      { id: '4', name: 'Main Precinct', type: 'Police Station', vicinity: '101 Justice Ave', location: { lat: lat - 0.003, lng: lng - 0.004 } },
    ],
    Disaster: [
      { id: '5', name: 'Disaster Relief Center', type: 'Relief Center', vicinity: '202 Safety Shelter Way', location: { lat: lat + 0.008, lng: lng + 0.005 } },
    ]
  };

  return mockData[type] || [];
};

export const NearbyPlaces: React.FC = () => {
  const { userLocation, emergencyType, setNearbyPlaces, nearbyPlaces } = useEmergencyStore();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (userLocation && emergencyType) {
      const loadPlaces = async () => {
        setIsFetching(true);
        try {
          const places = await fetchPlaces(userLocation.lat, userLocation.lng, emergencyType);
          setNearbyPlaces(places);
        } catch (error) {
          console.error('Failed to fetch nearby places', error);
        } finally {
          setIsFetching(false);
        }
      };
      loadPlaces();
    }
  }, [userLocation, emergencyType, setNearbyPlaces]);

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
        <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
        <p className="text-gray-500 font-bold">Scanning for nearby services...</p>
      </div>
    );
  }

  if (nearbyPlaces.length === 0) return null;

  return (
    <div className="w-full max-w-md space-y-4">
      <h3 className="text-xl font-black text-gray-900 uppercase flex items-center gap-2 px-2">
        <MapPin size={20} className="text-red-600" />
        Nearby {emergencyType} Services
      </h3>
      
      <div className="space-y-3">
        {nearbyPlaces.map((place) => (
          <div key={place.id} className="bg-white p-5 rounded-3xl shadow-lg border border-gray-100 transition-transform active:scale-98">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-black text-gray-800 text-lg">{place.name}</h4>
                <p className="text-sm text-gray-500 font-medium mb-1">{place.type}</p>
                <p className="text-sm text-gray-400 flex items-center gap-1">
                  <MapPin size={12} />
                  {place.vicinity}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-colors">
                  <Phone size={20} />
                </button>
                <button className="p-2 bg-gray-50 text-gray-400 rounded-xl hover:bg-green-600 hover:text-white transition-colors">
                  <ExternalLink size={20} />
                </button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
              <span className="text-xs font-bold text-green-600 uppercase">Open Now</span>
              <span className="text-xs font-medium text-gray-300">approx. 2.4 km</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
