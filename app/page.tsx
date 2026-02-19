"use client";

import React, { useState, useEffect, useRef } from "react";
import { EmergencyInput } from "@/components/EmergencyInput";
import { VoiceInput } from "@/components/VoiceInput";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { 
  ShieldCheck, 
  MapPin, 
  ChevronDown, 
  Info, 
  Eye, 
  Target, 
  Globe, 
  Zap,
  Activity,
  ShieldPlus
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Home() {
  const { error: geoError } = useGeoLocation();
  const categoriesRef = useRef<HTMLDivElement>(null);

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-x-hidden selection:bg-red-100 selection:text-red-900">
      
      {/* --- SECTION 1: VISION & MISSION --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-8 md:p-16 overflow-hidden bg-slate-50">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
          <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-red-50 rounded-full blur-[160px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-20%] w-[60%] h-[60%] bg-blue-50 rounded-full blur-[140px] animate-pulse delay-1000" />
        </div>

        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-12 animate-in fade-in slide-in-from-left-12 duration-1000">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-red-600 rounded-full shadow-2xl shadow-red-200">
              <ShieldCheck className="text-white" size={24} />
              <span className="text-sm font-black text-white uppercase tracking-[0.2em] italic">
                EEGA Proactive Shield
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] text-slate-900 uppercase italic">
              Empowering <br />
              <span className="text-red-600">Immediate</span> <br />
              Response.
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              <div className="space-y-4 group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-red-500 group-hover:text-white transition-all duration-500">
                  <Eye size={24} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight italic">Our Vision</h3>
                <p className="text-slate-500 font-bold leading-relaxed">
                  To create a world where critical emergency guidance is accessible to every human, anywhere, instantly.
                </p>
              </div>
              <div className="space-y-4 group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                  <Target size={24} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight italic">Our Mission</h3>
                <p className="text-slate-500 font-bold leading-relaxed">
                  Leveraging AI and real-time location data to provide life-saving procedures when seconds count.
                </p>
              </div>
            </div>

            <button 
              onClick={scrollToCategories}
              className="group flex items-center gap-4 px-10 py-6 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest hover:bg-red-600 transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl"
            >
              Take Action Now
              <ChevronDown className="animate-bounce group-hover:translate-y-1 transition-transform" />
            </button>
          </div>

          <div className="flex-1 relative hidden lg:block animate-in fade-in zoom-in duration-1000 delay-500">
             <div className="relative w-full aspect-square bg-white rounded-[4rem] shadow-[-40px_40px_100px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center justify-center overflow-hidden italic">
                {/* Simulated UI components */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-50/50 via-transparent to-transparent opacity-50" />
                <div className="z-10 text-[20rem] font-black text-slate-100/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12">EEGA</div>
                <div className="z-20 w-3/4 space-y-6">
                  <div className="h-16 bg-red-600 rounded-2xl animate-pulse" />
                  <div className="h-16 bg-slate-900 rounded-2xl animate-pulse delay-700" />
                  <div className="h-16 bg-slate-100 rounded-2xl animate-pulse delay-500" />
                </div>
             </div>
             {/* Dynamic Floating Badges */}
             <div className="absolute -top-8 -left-8 p-6 bg-white rounded-3xl shadow-2xl border border-slate-50 flex items-center gap-4 animate-bounce duration-[4000ms]">
                <Activity className="text-red-500" size={32} />
                <div>
                  <div className="text-[10px] font-black uppercase text-slate-400">Live Status</div>
                  <div className="text-sm font-black uppercase italic">GPS Tracking v4</div>
                </div>
             </div>
             <div className="absolute -bottom-8 -right-8 p-6 bg-white rounded-3xl shadow-2xl border border-slate-50 flex items-center gap-4 animate-bounce duration-[3000ms] delay-1000">
                <ShieldPlus className="text-blue-500" size={32} />
                <div>
                  <div className="text-[10px] font-black uppercase text-slate-400">Security</div>
                  <div className="text-sm font-black uppercase italic">Advanced Shield</div>
                </div>
             </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          onClick={scrollToCategories}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group opacity-40 hover:opacity-100 transition-opacity"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.4em] italic mb-2">Categories</span>
          <div className="w-1 h-12 bg-slate-200 rounded-full overflow-hidden">
            <div className="w-full h-1/2 bg-red-600 animate-[scroll_2s_infinite]" />
          </div>
        </div>
      </section>

      {/* --- SECTION 2: EMERGENCY CATEGORIES --- */}
      <section 
        ref={categoriesRef}
        className="min-h-screen py-24 md:py-32 flex flex-col items-center justify-center bg-white relative"
      >
        <div className="w-full max-w-7xl mx-auto px-8">
          <div className="flex flex-col items-center mb-24 text-center max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-3 px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
              <Zap size={14} className="text-yellow-400" />
              Quick Action Categories
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">
              What Is Your <br />
              <span className="text-red-600 underline decoration-slate-900/10 underline-offset-[12px] decoration-8">Emergency?</span>
            </h2>
            <p className="text-slate-500 font-bold text-lg max-w-2xl">
              Select the relevant category below. Our system will instantly prioritize your request and provide tailored life-saving guidance.
            </p>
          </div>

          <div className="flex justify-center">
            <EmergencyInput />
          </div>

          <div className="mt-32 flex flex-col items-center gap-12 text-center">
            <div className="w-full max-w-md h-px bg-slate-100" />
            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-[0.5em] text-slate-400">Voice Activation</h4>
              <VoiceInput />
            </div>
          </div>
        </div>

        {/* Global Floating Elements for Section 2 */}
        <div className="absolute top-1/4 left-10 opacity-20 pointer-events-none hidden xl:block">
          <Globe size={180} className="text-slate-50 animate-[spin_60s_linear_infinite]" />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-50 border-t border-slate-100 flex flex-col items-center px-8 text-center gap-8">
        <div className="flex items-center gap-6">
          <Globe size={20} className="text-slate-400" />
          <div className="h-4 w-px bg-slate-200" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-500 italic">EEGA Global Network Active</span>
        </div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] max-w-2xl leading-loose">
          Privacy Policy // Terms of Data Use // Neural link telemetry encrypted with RSA-4096. 
          Universal help for all humans in distress.
        </p>
      </footer>

      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </main>
  );
}
