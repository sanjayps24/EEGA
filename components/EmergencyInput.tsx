"use client";

import React from "react";
import { HeartPulse, Flame, ShieldAlert, AlertTriangle, CarFront, HelpCircle } from "lucide-react";
import { useEmergencyStore, EmergencyType } from "@/store/emergencyStore";
import { useRouter } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const EMERGENCY_OPTIONS = [
  {
    type: "Medical" as EmergencyType,
    label: "Medical",
    icon: HeartPulse,
    color: "bg-red-500",
    shadow: "shadow-red-500/20",
    hoverShadow: "hover:shadow-red-500/40",
    iconColor: "text-red-600",
  },
  {
    type: "Fire" as EmergencyType,
    label: "Fire",
    icon: Flame,
    color: "bg-orange-500",
    shadow: "shadow-orange-500/20",
    hoverShadow: "hover:shadow-orange-500/40",
    iconColor: "text-orange-600",
  },
  {
    type: "Police" as EmergencyType,
    label: "Police",
    icon: ShieldAlert,
    color: "bg-blue-500",
    shadow: "shadow-blue-500/20",
    hoverShadow: "hover:shadow-blue-500/40",
    iconColor: "text-blue-600",
  },
  {
    type: "Disaster" as EmergencyType,
    label: "Disaster",
    icon: AlertTriangle,
    color: "bg-yellow-500",
    shadow: "shadow-yellow-500/20",
    hoverShadow: "hover:shadow-yellow-500/40",
    iconColor: "text-yellow-600",
  },
  {
    type: "Accident" as EmergencyType,
    label: "Accident",
    icon: CarFront,
    color: "bg-purple-500",
    shadow: "shadow-purple-500/20",
    hoverShadow: "hover:shadow-purple-500/40",
    iconColor: "text-purple-600",
  },
  {
    type: null as EmergencyType,
    label: "Other",
    icon: HelpCircle,
    color: "bg-gray-500",
    shadow: "shadow-gray-500/20",
    hoverShadow: "hover:shadow-gray-500/40",
    iconColor: "text-gray-600",
  },
];

export const EmergencyInput: React.FC = () => {
  const setEmergencyType = useEmergencyStore((state) => state.setEmergencyType);
  const router = useRouter();

  const handleSelection = (type: EmergencyType) => {
    setEmergencyType(type);
    router.push("/emergency");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
      {EMERGENCY_OPTIONS.map((option, index) => (
        <button
          key={option.label}
          onClick={() => handleSelection(option.type)}
          className={cn(
            "group relative flex flex-col items-center justify-center p-8 rounded-[2.5rem]",
            "bg-white border-2 border-transparent transition-all duration-500",
            "hover:scale-[1.05] hover:border-current active:scale-95 shadow-xl",
            option.shadow,
            option.hoverShadow,
            "animate-in fade-in slide-in-from-bottom-12",
            `delay-[${index * 100}ms]`
          )}
          style={{ color: option.color.replace('bg-', '') }}
        >
          {/* Inner Glow Effect */}
          <div className={cn(
            "absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-10 transition-opacity duration-500",
            option.color
          )} />
          
          <div className={cn(
            "p-6 rounded-3xl mb-4 transition-all duration-500 group-hover:rotate-6",
            "bg-slate-50 group-hover:bg-white shadow-inner"
          )}>
            <option.icon 
              size={64} 
              strokeWidth={1.5} 
              className={cn("transition-all duration-500 group-hover:scale-110", option.iconColor)}
            />
          </div>
          
          <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-2">
            {option.label}
          </h3>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            Emergency Protocol
          </p>

          {/* Decorative Corner */}
          <div className={cn(
            "absolute top-6 right-6 w-4 h-4 rounded-full opacity-20",
            option.color
          )} />
        </button>
      ))}
    </div>
  );
};
