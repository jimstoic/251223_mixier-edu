'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Volume2 } from 'lucide-react';

export default function PrePostVis() {
    const [mainFader, setMainFader] = useState(75); // 0-100
    const [auxSend, setAuxSend] = useState(50);     // 0-100
    const [isPre, setIsPre] = useState(true);      // true = Pre, false = Post

    // Derived Logic
    // Main Out is purely Fader
    const mainOutLevel = mainFader;

    // Aux Out depends on Mode
    // Pre: Aux Out = Aux Send Value (Independent of Fader)
    // Post: Aux Out = Aux Send Value * (Main Fader %)
    const auxOutLevel = isPre
        ? auxSend
        : auxSend * (mainFader / 100);

    return (
        <div className="w-full p-8 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row gap-12 items-center justify-center">

            {/* Control Section */}
            <div className="flex bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-xl gap-8">

                {/* 1. Main Channel Strip (Fader) */}
                <div className="flex flex-col items-center gap-4">
                    <label className="text-xs font-bold text-slate-500 uppercase">Main Fader</label>
                    <div className="h-64 w-12 bg-slate-950 rounded-full border border-slate-800 relative py-4">
                        {/* Track */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 bg-slate-800 rounded-full" />

                        {/* Cap (Draggable-ish / Input Range Overlay) */}
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={mainFader}
                            onChange={(e) => setMainFader(Number(e.target.value))}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-ns-resize z-20"
                            title="Drag to adjust Main Volume"
                        />

                        {/* Visual Cap */}
                        <motion.div
                            className="absolute left-1/2 -translate-x-1/2 w-8 h-12 bg-gradient-to-b from-slate-400 to-slate-600 rounded shadow-lg border-t border-slate-300 z-10 pointer-events-none"
                            style={{ bottom: `${mainFader}%`, transform: 'translateX(-50%) translateY(50%)' }}
                        >
                            <div className="w-full h-[1px] bg-slate-900 mt-6 box-shadow-white" />
                        </motion.div>
                    </div>
                    <div className="font-mono text-cyan-400 font-bold">{mainFader}%</div>
                </div>

                {/* 2. Aux Send Section */}
                <div className="flex flex-col items-center justify-between py-4">
                    <div className="flex flex-col items-center gap-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Aux Send</label>

                        {/* Rotary Knob Sim (Simple Vertical Slider for ease) */}
                        <div className="relative w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-600 shadow-inner flex items-center justify-center">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={auxSend}
                                onChange={(e) => setAuxSend(Number(e.target.value))}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                title="Adjust Aux Send Amount"
                            />
                            {/* Visual Indicator */}
                            <div
                                className="w-1 h-8 bg-pink-500 origin-bottom rounded-full"
                                style={{ transform: `rotate(${(auxSend / 100) * 270 - 135}deg) translateY(-50%)` }}
                            />
                            <div className="absolute inset-0 rounded-full border border-slate-700 pointer-events-none" />
                        </div>
                        <div className="font-mono text-pink-400 font-bold">{auxSend}%</div>
                    </div>

                    {/* Pre/Post Switch */}
                    <div className="flex flex-col items-center gap-2 mt-8">
                        <div className="text-[10px] font-bold text-slate-500 uppercase">Mode</div>
                        <button
                            onClick={() => setIsPre(!isPre)}
                            className={clsx(
                                "relative w-16 h-8 rounded-full border transition-all duration-300 flex items-center px-1 shadow-inner",
                                isPre ? "bg-emerald-500/20 border-emerald-500" : "bg-orange-500/20 border-orange-500"
                            )}
                        >
                            <motion.div
                                layout
                                className={clsx(
                                    "w-6 h-6 rounded-full shadow-md",
                                    isPre ? "bg-emerald-500" : "bg-orange-500"
                                )}
                            />
                        </button>
                        <div className={clsx("text-xs font-bold", isPre ? "text-emerald-500" : "text-orange-500")}>
                            {isPre ? 'PRE Fader' : 'POST Fader'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Results / Meters Section */}
            <div className="flex gap-8">
                {/* Main Output */}
                <div className="flex flex-col items-center gap-2">
                    <div className="h-48 w-8 bg-slate-900 rounded-full border border-slate-800 overflow-hidden relative">
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 bg-cyan-500"
                            animate={{ height: `${mainOutLevel}%` }}
                        />
                    </div>
                    <div className="text-xs font-bold text-slate-500 text-center">Main<br />Out</div>
                </div>

                {/* Aux Output */}
                <div className="flex flex-col items-center gap-2">
                    <div className="h-48 w-8 bg-slate-900 rounded-full border border-slate-800 overflow-hidden relative">
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 bg-pink-500"
                            animate={{ height: `${auxOutLevel}%` }}
                        />
                    </div>
                    <div className="text-xs font-bold text-slate-500 text-center">Monitor<br />(Aux)</div>
                </div>
            </div>

            {/* Context Explanation */}
            <div className="absolute bottom-4 right-4 max-w-xs text-xs text-slate-500 text-right hidden lg:block">
                {isPre ? (
                    <span>PRE: Mainフェーダーを下げても<br />モニターの音量は変わりません。<br /><span className="text-emerald-500 font-bold">Safe for Monitoring!</span></span>
                ) : (
                    <span>POST: Mainフェーダーを下げると<br />モニターの音量も一緒に下がります。<br /><span className="text-orange-500 font-bold">Good for Effects!</span></span>
                )}
            </div>

        </div>
    );
}
