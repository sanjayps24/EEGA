"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useEmergencyStore } from "@/store/emergencyStore";
import { MapView } from "@/components/MapView";
import { NearbyPlaces } from "@/components/NearbyPlaces";
import { GuidanceCard } from "@/components/GuidanceCard";
import { Helplines } from "@/components/Helplines";
import { ArrowLeft, Share2, AlertOctagon, Activity, MapPin } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function EmergencyPage() {
  const { emergencyType, reset } = useEmergencyStore();
  const router = useRouter();

  useEffect(() => {
    if (!emergencyType) {
      router.push("/");
    }
  }, [emergencyType, router]);

  if (!emergencyType) return null;

  const handleBack = () => {
    reset();
    router.push("/");
  };

  const emergencyColors = {
    Medical: "bg-red-600",
    Fire: "bg-orange-600",
    Police: "bg-blue-600",
    Disaster: "bg-yellow-500",
    Accident: "bg-purple-600",
  };

  const bgColor = emergencyColors[emergencyType] || "bg-slate-900";

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pb-32">
      {/* Active Emergency Header */}
      <div className={cn("w-full text-white p-8 md:p-12 shadow-2xl flex flex-col gap-6 relative overflow-hidden", bgColor)}>
        {/* Background decorative pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>

        <div className="flex justify-between items-center relative z-10">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-2xl hover:bg-white/30 transition-all font-black uppercase text-xs tracking-widest backdrop-blur-md"
          >
            <ArrowLeft size={18} />
            Abort
          </button>
          <div className="flex items-center gap-3">
            <AlertOctagon className="animate-bounce" size={24} />
            <h1 className="text-sm font-black uppercase tracking-[0.3em] italic">Priority Alpha</h1>
          </div>
          <button className="p-3 bg-white/20 rounded-2xl hover:bg-white/30 transition-all backdrop-blur-md">
            <Share2 size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center py-6 relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-2">Active Incident</p>
          <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-4 drop-shadow-2xl">
            {emergencyType}
          </h2>
          <div className="px-6 py-2 bg-black/20 rounded-full text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-xl border border-white/10">
            Emergency Protocol Engaged
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 mt-[-3rem] relative z-20">
        
        {/* Left Column: Location & Services */}
        <div className="space-y-10 animate-in fade-in slide-in-from-left-8 duration-700">
          {/* Map Section */}
          <div className="bg-white p-6 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
             <div className="flex justify-between items-center mb-6 px-4">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-blue-500/10 rounded-xl text-blue-600">
                      <MapPin size={22} />
                   </div>
                   <h3 className="text-xl font-black uppercase tracking-tight italic">Live Tracking</h3>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-black text-blue-600 uppercase animate-pulse">
                  <Activity size={12} />
                  GPS Active
                </span>
             </div>
             <div className="relative overflow-hidden rounded-[2rem] border-4 border-slate-50 shadow-inner">
               <MapView />
             </div>
          </div>

          <NearbyPlaces />
        </div>

        {/* Right Column: Guidance & Calls */}
        <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
          <Helplines />
          <GuidanceCard />
        </div>
      </div>

      {/* Floating Call Button for Mobile */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xs px-6 lg:hidden">
        <button 
           onClick={() => window.open('tel:911', '_self')}
           className="w-full bg-red-600 text-white font-black py-6 rounded-[2rem] shadow-[0_20px_50px_rgba(220,38,38,0.3)] active:scale-95 transition-all text-xl uppercase tracking-tighter flex items-center justify-center gap-4"
        >
          <AlertOctagon size={28} className="animate-pulse" />
          Quick Dial 911
        </button>
      </div>
    </main>
  );
}
