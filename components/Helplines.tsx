"use client";

import React from "react";
import { Phone, PhoneCall, HeartPulse, ShieldAlert, Flame, CarFront, Globe } from "lucide-react";
import { useEmergencyStore, EmergencyType } from "@/store/emergencyStore";

const HELPLINE_DATA: Record<string, { number: string; label: string; icon: any; color: string }> = {
  Medical: { number: "911", label: "Ambulance / Medical", icon: HeartPulse, color: "bg-red-500" },
  Fire: { number: "911", label: "Fire Department", icon: Flame, color: "bg-orange-500" },
  Police: { number: "911", label: "Police Department", icon: ShieldAlert, color: "bg-blue-500" },
  Disaster: { number: "112", label: "Disaster Management", icon: Globe, color: "bg-yellow-500" },
  Accident: { number: "911", label: "Highway Patrol / Accident", icon: CarFront, color: "bg-purple-500" },
  Global: { number: "112", label: "International Emergency", icon: PhoneCall, color: "bg-slate-900" },
};

export const Helplines: React.FC = () => {
  const { emergencyType } = useEmergencyStore();

  const currentHelpline = emergencyType ? HELPLINE_DATA[emergencyType] : null;
  const globalHelpline = HELPLINE_DATA["Global"];

  const handleCall = (number: string) => {
    window.open(`tel:${number}`, "_self");
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="flex items-center gap-4 px-2">
        <Phone className="text-slate-400" size={20} />
        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight italic">
          Emergency Helplines
        </h3>
      </div>

      <div className="space-y-4">
        {currentHelpline && (
          <button
            onClick={() => handleCall(currentHelpline.number)}
            className="w-full group flex items-center justify-between p-6 bg-white rounded-[2rem] border-2 border-slate-100 shadow-xl shadow-slate-100/50 hover:border-current hover:scale-[1.02] active:scale-95 transition-all duration-300"
            style={{ color: currentHelpline.color.replace('bg-', '') }}
          >
            <div className="flex items-center gap-5">
              <div className={`p-4 rounded-2xl text-white ${currentHelpline.color} shadow-lg shadow-current/20 group-hover:rotate-6 transition-transform`}>
                <currentHelpline.icon size={28} />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-black uppercase text-slate-400 mb-1">Direct Line</div>
                <div className="text-xl font-black uppercase text-slate-900 leading-none">{currentHelpline.label}</div>
              </div>
            </div>
            <div className={`text-2xl font-black ${currentHelpline.color.replace('bg-', 'text-')} italic`}>
              {currentHelpline.number}
            </div>
          </button>
        )}

        <button
          onClick={() => handleCall(globalHelpline.number)}
          className="w-full group flex items-center justify-between p-6 bg-white rounded-[2rem] border-2 border-slate-100 shadow-xl shadow-slate-100/50 hover:border-slate-900 hover:scale-[1.02] active:scale-95 transition-all duration-300"
        >
          <div className="flex items-center gap-5 text-slate-900">
            <div className="p-4 rounded-2xl text-white bg-slate-900 shadow-lg shadow-slate-900/20 group-hover:rotate-6 transition-transform">
              <globalHelpline.icon size={28} />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-black uppercase text-slate-400 mb-1">Global Standard</div>
              <div className="text-xl font-black uppercase text-slate-900 leading-none">{globalHelpline.label}</div>
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 italic">
            {globalHelpline.number}
          </div>
        </button>
      </div>
      
      <p className="px-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">
        Tapping a number will initiate a direct phone call.
      </p>
    </div>
  );
};
