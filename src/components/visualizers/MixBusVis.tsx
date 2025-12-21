'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { ArrowRight, Speaker, Volume2 } from 'lucide-react';

export default function MixBusVis() {
    // 3 Source Channels
    const [channels, setChannels] = useState([
        { id: 1, label: 'MC', routing: { st: true, bus1: false, bus2: false }, color: 'text-pink-400', bg: 'bg-pink-500' },
        { id: 2, label: 'Guest', routing: { st: true, bus1: false, bus2: false }, color: 'text-cyan-400', bg: 'bg-cyan-500' },
        { id: 3, label: 'BGM', routing: { st: true, bus1: false, bus2: false }, color: 'text-yellow-400', bg: 'bg-yellow-500' },
    ]);

    const toggleRouting = (chId: number, dest: 'st' | 'bus1' | 'bus2') => {
        setChannels(prev => prev.map(ch =>
            ch.id === chId ? { ...ch, routing: { ...ch.routing, [dest]: !ch.routing[dest] } } : ch
        ));
    };

    return (
        <div className="w-full p-8 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-6 items-center justify-center select-none">

            <div className="flex gap-8 items-start relative">

                {/* --- CHANNELS --- */}
                <div className="flex gap-4">
                    {channels.map((ch) => (
                        <div key={ch.id} className="flex flex-col items-center bg-slate-900 border border-slate-800 p-2 rounded-lg gap-2 shadow-lg">
                            <div className={clsx("font-bold text-lg mb-2", ch.color)}>{ch.label}</div>

                            {/* Routing Buttons */}
                            <div className="flex flex-col gap-1 mb-4 bg-slate-950 p-1 rounded border border-slate-800">
                                <button
                                    onClick={() => toggleRouting(ch.id, 'st')}
                                    className={clsx(
                                        "w-12 h-6 text-[10px] font-bold border rounded transition-all",
                                        ch.routing.st
                                            ? "bg-red-500 border-red-400 text-white shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                                            : "bg-slate-800 border-slate-700 text-slate-500"
                                    )}
                                >
                                    ST
                                </button>
                                <button
                                    onClick={() => toggleRouting(ch.id, 'bus1')}
                                    className={clsx(
                                        "w-12 h-6 text-[10px] font-bold border rounded transition-all",
                                        ch.routing.bus1
                                            ? "bg-emerald-500 border-emerald-400 text-white shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                                            : "bg-slate-800 border-slate-700 text-slate-500"
                                    )}
                                >
                                    1
                                </button>
                                <button
                                    onClick={() => toggleRouting(ch.id, 'bus2')}
                                    className={clsx(
                                        "w-12 h-6 text-[10px] font-bold border rounded transition-all",
                                        ch.routing.bus2
                                            ? "bg-emerald-500 border-emerald-400 text-white shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                                            : "bg-slate-800 border-slate-700 text-slate-500"
                                    )}
                                >
                                    2
                                </button>
                            </div>

                            {/* Fader Stub */}
                            <div className="w-8 h-24 bg-slate-950 rounded border border-slate-800 relative">
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-6 h-10 bg-gradient-to-b from-slate-400 to-slate-600 rounded shadow border-t border-slate-300">
                                    <div className="w-full h-[1px] bg-slate-800 mt-5" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- ARROWS & FLOW --- */}
                <div className="w-24 h-64 flex flex-col justify-center gap-12 opacity-50">
                    <ArrowRight className="w-8 h-8 text-slate-600 ml-8" />
                </div>

                {/* --- OUTPUTS --- */}
                <div className="flex flex-col gap-2">
                    {/* STEREO OUT */}
                    <div className="h-20 w-48 bg-slate-900 border border-red-900/30 rounded-lg flex items-center justify-between px-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-red-500/5 pointer-events-none" />
                        <div className="z-10 text-xs font-bold text-red-500 flex flex-col">
                            <span>STEREO L/R</span>
                            <span className="text-[10px] text-red-400/50">Main Speakers</span>
                        </div>
                        {/* Meter */}
                        <div className="flex gap-1 h-12 items-end">
                            {channels.filter(c => c.routing.st).map(c => (
                                <motion.div key={c.id} layoutId={`st-${c.id}`} className={clsx("w-2 rounded-t-sm animate-pulse", c.bg)} style={{ height: '80%' }} />
                            ))}
                        </div>
                    </div>

                    {/* MIX 1 */}
                    <div className="h-20 w-48 bg-slate-900 border border-emerald-900/30 rounded-lg flex items-center justify-between px-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />
                        <div className="z-10 text-xs font-bold text-emerald-500 flex flex-col">
                            <span>MIX 1</span>
                            <span className="text-[10px] text-emerald-400/50">Monitor / Zoom</span>
                        </div>
                        <div className="flex gap-1 h-12 items-end">
                            {channels.filter(c => c.routing.bus1).map(c => (
                                <motion.div key={c.id} layoutId={`b1-${c.id}`} className={clsx("w-2 rounded-t-sm animate-pulse", c.bg)} style={{ height: '60%' }} />
                            ))}
                        </div>
                    </div>

                    {/* MIX 2 */}
                    <div className="h-20 w-48 bg-slate-900 border border-emerald-900/30 rounded-lg flex items-center justify-between px-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />
                        <div className="z-10 text-xs font-bold text-emerald-500 flex flex-col">
                            <span>MIX 2</span>
                            <span className="text-[10px] text-emerald-400/50">Recording</span>
                        </div>
                        <div className="flex gap-1 h-12 items-end">
                            {channels.filter(c => c.routing.bus2).map(c => (
                                <motion.div key={c.id} layoutId={`b2-${c.id}`} className={clsx("w-2 rounded-t-sm animate-pulse", c.bg)} style={{ height: '60%' }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-slate-500 text-xs mt-4">
                各チャンネルの ST / 1 / 2 ボタンを押して、信号の「行き先」を変えてみてください。
            </p>
        </div>
    );
}
