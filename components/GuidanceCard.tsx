"use client";

import React from "react";
import { useEmergencyStore } from "@/store/emergencyStore";
import { CheckCircle2, Clock, Info, AlertTriangle } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const GUIDANCE_DATA = {
  Medical: [
    "Check if the person is conscious and breathing.",
    "Clear the area around the patient and ensure safety.",
    "Do not move the person unless they are in immediate danger.",
    "If bleeding, apply firm pressure with a clean cloth.",
    "Wait for professional medical help to arrive.",
  ],
  Fire: [
    "Alert everyone in the building immediately.",
    "Evacuate using the nearest exit. Do not use elevators.",
    "If caught in smoke, stay low and crawl toward the exit.",
    "Test doors for heat with the back of your hand before opening.",
    "Call the fire department once you are safe.",
  ],
  Police: [
    "Find a safe location and stay hidden if necessary.",
    "Disable phone alerts and sounds to remain undetected.",
    "Observe details of the situation only if safe (suspect description, vehicle info).",
    "Identify all possible exits in your current location.",
    "Wait for law enforcement instructions and keep hands visible.",
  ],
  Disaster: [
    "Drop, Cover, and Hold On (for earthquakes).",
    "Stay away from glass, windows, and heavy furniture.",
    "Move to higher ground if in a flood-prone area.",
    "Shut off utilities (gas, water, electricity) if safe to do so.",
    "Listen to local emergency broadcasts for official updates.",
  ],
  Accident: [
    "Ensure your own safety before attempting to help others.",
    "Turn on hazard lights and place warning triangles if available.",
    "Check for injuries but do not move seriously injured people.",
    "Collect witness information and take photos of the scene if safe.",
    "Stay at the scene until emergency services arrive.",
  ],
};

export const GuidanceCard: React.FC = () => {
  const { emergencyType } = useEmergencyStore();

  if (!emergencyType) return null;

  const steps = GUIDANCE_DATA[emergencyType] || [
    "Stay calm and assess the situation.",
    "Contact local emergency services immediately.",
    "Assist others only if it is safe to do so.",
    "Follow instructions from official personnel.",
  ];

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 w-full max-w-md animate-in fade-in zoom-in-95 duration-700">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-blue-500/10 p-3 rounded-2xl">
          <Info className="text-blue-600" size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">
            Immediate Response
          </h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Protocol: Follow Carefully
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-5 group items-start">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-2xl bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-slate-900 font-black text-lg group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                {index + 1}
              </div>
            </div>
            <p className="text-slate-700 font-semibold leading-relaxed pt-1 group-hover:text-slate-900 transition-colors">
              {step}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 p-4 rounded-2xl bg-amber-50 border border-amber-100 flex items-center gap-3">
        <AlertTriangle className="text-amber-500 shrink-0" size={20} />
        <p className="text-[11px] font-bold text-amber-700 uppercase leading-tight">
          Warning: Professional help is always the first priority.
        </p>
      </div>

      <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
        <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
          <Clock size={12} />
          Updated Real-time
        </span>
        <span className="flex items-center gap-1.5 font-black text-green-600 uppercase tracking-wider">
          <CheckCircle2 size={12} />
          Validated Steps
        </span>
      </div>
    </div>
  );
};
