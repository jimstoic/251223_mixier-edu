'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { AlertTriangle, Volume2 } from 'lucide-react';
import { clsx } from 'clsx';

export default function GainStagingVis() {
    // State 0-100
    const [gain, setGain] = useState(30);   // "Water Pressure"
    const [fader, setFader] = useState(70);  // "Faucet Openness"

    // Interpretation
    // Clipping happens if Gain > 85
    const isClipping = gain > 85;

    // Visual Thickness based on Gain (amplification)
    // Min 20% height, Max 100% height
    // Adjusted Logic:
    // Gain affects "thickness" (input level). 
    // Fader affects "width" (output amount), but clipped signal stays clipped red.

    // 1. Gain (Input) Physics
    // Low gain = thin trickle. High gain = full pipe.
    // Clipping threshold: > 85
    const signalThickness = 10 + (gain / 100) * 90; // Min 10%, Max 100%

    // 2. Fader (Output) Physics
    // Fader just opens the gate. It doesn't fix a clipped signal.
    const outputWidth = fader;

    // 3. Visual Feedback
    const flowColor = isClipping ? "bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.8)]" : "bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]";

    return (
        <div className="p-8 bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-12 items-center justify-center relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />

            {/* SECTION 1: PRE-AMP (Water Source) */}
            <div className="flex flex-col items-center gap-4 z-10">
                <div className="text-amber-500 font-bold tracking-widest text-sm uppercase">1. HAゲイン (水量)</div>

                {/* Knob UI */}
                <div className="relative w-32 h-32">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={gain}
                        onChange={(e) => setGain(Number(e.target.value))}
                        className="w-full h-full opacity-0 absolute inset-0 cursor-pointer z-20"
                    />
                    {/* Knob Visual */}
                    <div className="w-full h-full rounded-full border-4 border-slate-700 bg-slate-800 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] flex items-center justify-center transition-transform"
                        style={{ transform: `rotate(${(gain / 100) * 270 - 135}deg)` }}
                    >
                        <div className="w-2 h-8 bg-amber-500 rounded-full mb-16 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                    </div>
                    {/* Label */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-2xl font-bold text-slate-300 pointer-events-none">
                        {gain}%
                    </div>
                </div>
                <p className="text-slate-400 text-xs text-center max-w-[150px]">
                    パイプに入ってくる<strong>「水の量と勢い」</strong>を決めます。<br />上げすぎると破裂します。
                </p>
            </div>

            {/* SECTION 2: THE PIPE (Visualizer) */}
            <div className="flex-1 w-full h-40 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden flex items-center px-4">
                {/* Pipe Container - Fixed Height */}
                <div className="w-full h-full flex items-center justify-start relative">
                    {/* Water Flow - Height changes with Gain, Width with Fader */}
                    <motion.div
                        className={clsx(
                            "rounded-r-full transition-colors duration-100 relative z-10",
                            flowColor
                        )}
                        style={{
                            height: `${signalThickness}%`,
                        }}
                        animate={{
                            width: `${outputWidth}%`,
                            opacity: 0.6 + (gain / 300),
                        }}
                        transition={{ type: "spring", bounce: 0, duration: 0.2 }}
                    />

                    {/* Particles (Bubbles) inside the flow */}
                    {fader > 5 && (
                        <ParticleStream speed={gain} isClipping={isClipping} />
                    )}
                </div>

                {/* Warning: Clipping */}
                <div className={clsx(
                    "absolute top-2 right-2 flex items-center gap-2 px-3 py-1 rounded bg-red-500/10 border border-red-500/50 text-red-500 text-xs font-bold transition-opacity duration-200 z-20",
                    isClipping ? "opacity-100" : "opacity-0"
                )}>
                    <AlertTriangle className="w-4 h-4" />
                    PEAK (音割れ)
                </div>
            </div>

            {/* SECTION 3: FADER (The Faucet) */}
            <div className="flex flex-col items-center gap-4 z-10 w-32">
                <div className="text-cyan-500 font-bold tracking-widest text-sm uppercase">2. フェーダー (蛇口)</div>

                <div className="flex items-center gap-2 h-64">
                    {/* dB Scale */}
                    <div className="h-full flex flex-col justify-between text-[10px] font-mono text-slate-500 py-1 text-right">
                        <span>+10</span>
                        <span>+5</span>
                        <span>0</span>
                        <span>-5</span>
                        <span>-10</span>
                        <span>-20</span>
                        <span>-40</span>
                        <span>-∞</span>
                    </div>

                    <div className="h-full fader-track relative w-12 flex justify-center">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={fader}
                            onChange={(e) => setFader(Number(e.target.value))}
                            className="w-full h-full opacity-0 absolute inset-0 cursor-pointer z-20 [-webkit-appearance:slider-vertical]"
                        />
                        {/* Fader Cap Visual */}
                        <div
                            className="w-16 h-8 bg-gradient-to-b from-slate-600 to-slate-800 border-t border-slate-500 rounded shadow-2xl absolute transition-all duration-75 pointer-events-none flex items-center justify-center z-10"
                            style={{ bottom: `${fader}%` }}
                        >
                            <div className="w-full h-[1px] bg-white opacity-50" />
                        </div>
                        {/* Unity Gain Line */}
                        <div className="absolute bottom-[70%] w-full h-[1px] bg-slate-600 z-0" />
                    </div>
                </div>

                <p className="text-slate-400 text-xs text-center">
                    出ていく<strong>「水量」</strong>を調整します。<br />蛇口を絞っても、元圧(Gain)が高すぎると割れます。
                </p>
            </div>
        </div>
    );
}

// Simple particle effect for flow visualization
function ParticleStream({ speed, isClipping }: { speed: number; isClipping: boolean }) {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className={clsx("absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full", isClipping ? "bg-red-200" : "bg-cyan-200")}
                    initial={{ left: "-10%" }}
                    animate={{ left: "110%" }}
                    transition={{
                        repeat: Infinity,
                        duration: 2 - (speed / 100), // Speed up with gain
                        delay: i * 0.4,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    )
}
