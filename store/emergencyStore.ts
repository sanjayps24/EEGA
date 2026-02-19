import { create } from "zustand";

export type EmergencyType = "Medical" | "Fire" | "Police" | "Disaster" | "Accident" | null;

export interface Location {
  lat: number;
  lng: number;
}

export interface NearbyPlace {
  id: string;
  name: string;
  type: string;
  vicinity: string;
  location: Location;
}

interface EmergencyState {
  emergencyType: EmergencyType;
  userLocation: Location | null;
  nearbyPlaces: NearbyPlace[];
  loading: boolean;
  setEmergencyType: (type: EmergencyType) => void;
  setUserLocation: (location: Location) => void;
  setNearbyPlaces: (places: NearbyPlace[]) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useEmergencyStore = create<EmergencyState>((set) => ({
  emergencyType: null,
  userLocation: null,
  nearbyPlaces: [],
  loading: false,

  setEmergencyType: (emergencyType) => set({ emergencyType }),
  setUserLocation: (userLocation) => set({ userLocation }),
  setNearbyPlaces: (nearbyPlaceList) => set({ nearbyPlaces: nearbyPlaceList }),
  setLoading: (loading) => set({ loading }),

  reset: () =>
    set({
      emergencyType: null,
      userLocation: null,
      nearbyPlaces: [],
      loading: false,
    }),
}));
