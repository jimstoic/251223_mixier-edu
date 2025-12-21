'use client';

import React, { useState } from 'react';
import { Mic, Music, Settings, Power } from 'lucide-react';
import { clsx } from 'clsx';

// Simulated Data
const initialChannels = [
    { id: 1, label: 'CH 1', name: 'Mic 1', type: 'mic', gain: 30, eq: { low: 2, mid: -3, high: 5 }, comp: true },
    { id: 2, label: 'CH 2', name: 'Mic 2', type: 'mic', gain: 20, eq: { low: 0, mid: 0, high: 2 }, comp: false },
    { id: 3, label: 'CH 3', name: 'BGM L', type: 'line', gain: 10, eq: { low: 4, mid: 0, high: 0 }, comp: false },
    { id: 4, label: 'CH 4', name: 'BGM R', type: 'line', gain: 10, eq: { low: 4, mid: 0, high: 0 }, comp: false },
];

export default function SurfaceVis() {
    const [channels, setChannels] = useState(initialChannels);
    const [selectedChId, setSelectedChId] = useState<number>(1);

    // Get currently selected channel data
    const selectedCh = channels.find(c => c.id === selectedChId) || channels[0];

    // Handler to update gain for the selected channel
    const handleGainChange = (newGain: number) => {
        setChannels(prev => prev.map(ch =>
            ch.id === selectedChId ? { ...ch, gain: newGain } : ch
        ));
    };

    return (
        <div className="w-full panel-base p-6 select-none bg-[#1a1a1a] text-slate-200 font-sans">
            {/* DM3 Style Screen */}
            <div className="grid grid-cols-12 grid-rows-6 gap-1 bg-black border border-slate-700 h-[320px] mb-8 relative overflow-hidden shadow-2xl">

                {/* --- HEADER ROW (Scene, Icons) --- */}
                <div className="col-span-12 row-span-1 bg-[#222] border-b border-slate-700 flex items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <div className="text-3xl font-bold text-slate-300">A00</div>
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Initial Data</div>
                    </div>
                    <div className="flex gap-4 text-slate-500">
                        <Settings size={18} />
                    </div>
                </div>

                {/* --- LEFT COLUMN: HA / Input --- */}
                <div className="col-span-3 row-span-5 bg-[#1e1e1e] border-r border-slate-800 p-2 flex flex-col gap-2">
                    {/* Input Gain Section */}
                    <div className="bg-[#2a2a2a] rounded p-2 flex flex-col items-center border border-slate-700 relative">
                        <div className="absolute top-1 left-2 text-[10px] text-pink-500 font-bold">HA</div>

                        {/* Gain Knob */}
                        <div className="relative w-16 h-16 mt-2 mb-1 group cursor-pointer">
                            <input
                                type="range"
                                min="0"
                                max="60"
                                value={selectedCh.gain}
                                onChange={(e) => handleGainChange(Number(e.target.value))}
                                className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-ns-resize"
                            />
                            <div className="w-full h-full rounded-full border-2 border-slate-600 bg-[#111] flex items-center justify-center transform transition-transform"
                                style={{ transform: `rotate(${(selectedCh.gain / 60) * 270 - 135}deg)` }}
                            >
                                <div className="w-1 h-6 bg-pink-500 rounded-full mb-6" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold font-mono text-slate-100 min-w-[3rem] text-center">
                            {selectedCh.gain} <span className="text-[10px] text-slate-500">dB</span>
                        </div>

                        {/* 48V / Phase */}
                        <div className="flex gap-2 mt-2 w-full justify-center">
                            <div className="text-[9px] bg-slate-700 text-slate-400 px-1 rounded border border-slate-600">+48V</div>
                            <div className="text-[9px] bg-slate-700 text-slate-400 px-1 rounded border border-slate-600">Ø</div>
                        </div>
                    </div>

                    {/* Fader Label (Bottom Left) */}
                    <div className="mt-auto bg-slate-200 text-black p-2 rounded-sm relative h-16 flex flex-col justify-end">
                        <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-white/30"></div>
                        <div className="font-bold text-xl leading-none">{selectedCh.label}</div>
                        <div className="font-bold text-sm opacity-75">{selectedCh.name}</div>
                        <Mic size={16} className="absolute top-1 right-1 opacity-50 text-amber-600" />
                    </div>
                </div>

                {/* --- MIDDLE: EQ GRAPH (Large) --- */}
                <div className="col-span-6 row-span-5 bg-[#151515] border-r border-slate-800 p-2 relative">
                    <div className="flex gap-2 mb-2">
                        <div className="bg-green-700 text-white text-xs font-bold px-2 py-0.5 rounded shadow">EQ</div>
                        <div className="bg-[#333] text-slate-400 text-xs px-2 py-0.5 rounded">HPF</div>
                    </div>

                    {/* Grid Lines */}
                    <div className="absolute inset-x-4 top-10 bottom-4 border-l border-b border-slate-700/50">
                        {/* Horizontal Freq Grid */}
                        <div className="absolute left-[20%] top-0 bottom-0 w-[1px] bg-slate-800/30"></div>
                        <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-slate-800/30"></div>
                        <div className="absolute left-[80%] top-0 bottom-0 w-[1px] bg-slate-800/30"></div>

                        {/* Center dB Line */}
                        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-green-500/20"></div>

                        {/* EQ Nodes */}
                        <div className="absolute w-6 h-6 rounded-full bg-slate-600 text-[9px] flex items-center justify-center text-white font-bold border border-slate-400"
                            style={{ left: '10%', top: '50%' }}>HPF</div>
                        <div className="absolute w-6 h-6 rounded-full bg-slate-600 text-[9px] flex items-center justify-center text-white font-bold border border-slate-400"
                            style={{ left: '30%', top: `${50 - selectedCh.eq.low * 3}%` }}>L</div>
                        <div className="absolute w-6 h-6 rounded-full bg-slate-600 text-[9px] flex items-center justify-center text-white font-bold border border-slate-400"
                            style={{ left: '50%', top: `${50 - selectedCh.eq.mid * 3}%` }}>LM</div>
                        <div className="absolute w-6 h-6 rounded-full bg-slate-600 text-[9px] flex items-center justify-center text-white font-bold border border-slate-400"
                            style={{ left: '70%', top: '50%' }}>HM</div>
                        <div className="absolute w-6 h-6 rounded-full bg-slate-600 text-[9px] flex items-center justify-center text-white font-bold border border-slate-400"
                            style={{ left: '90%', top: `${50 - selectedCh.eq.high * 3}%` }}>H</div>

                        {/* Simple Line Visualization (SVG) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-green-500 stroke-[2px] fill-none">
                            <path d={`M 0 50 Q 80 ${50 - selectedCh.eq.low * 5} 150 ${50 - selectedCh.eq.mid * 3} T 300 ${50 - selectedCh.eq.high * 5}`} />
                        </svg>
                    </div>

                    {/* Freq Labels */}
                    <div className="absolute bottom-1 left-4 right-4 flex justify-between text-[8px] text-slate-600 font-mono">
                        <span>20</span>
                        <span>100</span>
                        <span>1k</span>
                        <span>10k</span>
                        <span>20k</span>
                    </div>
                </div>

                {/* --- RIGHT COLUMN: DYNAMICS --- */}
                <div className="col-span-3 row-span-5 bg-[#1a1a1a] flex flex-col gap-[1px]">
                    {/* DYN 1 (GATE) */}
                    <div className="h-1/2 bg-[#222] p-2 relative border-b border-black">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-slate-400">DYN 1</span>
                            <span className="text-xs text-slate-500 font-mono">GATE</span>
                        </div>
                        <div className="bg-black border border-slate-700 h-20 w-full relative">
                            {/* Gate Curve */}
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-600"></div>
                            <div className="absolute bottom-0 left-0 w-[1px] h-full bg-slate-600"></div>
                            <div className="absolute bottom-0 left-0 w-full h-full border-t border-r border-slate-800"></div>
                            {/* Threshold Line */}
                            <div className="absolute h-full w-[1px] bg-green-500/50 left-[40%]"></div>
                            <div className="absolute top-[30%] left-[40%] text-[8px] text-green-400 bg-black px-1">T</div>
                        </div>
                        <div className="absolute right-2 top-8 text-right">
                            <div className="text-[10px] text-slate-500">THRESH</div>
                            <div className="text-sm font-bold text-white font-mono">-46</div>
                        </div>
                    </div>

                    {/* DYN 2 (COMP) */}
                    <div className="h-1/2 bg-[#222] p-2 relative">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-slate-400">DYN 2</span>
                            <span className="text-[10px] bg-slate-700 px-1 rounded text-slate-300">COMP</span>
                        </div>
                        <div className="bg-black border border-slate-700 h-20 w-full relative">
                            {/* Comp Curve */}
                            <svg className="absolute inset-0 w-full h-full stroke-green-200 stroke-[1px] fill-none opacity-50">
                                <line x1="0" y1="100%" x2="50%" y2="50%" />
                                <line x1="50%" y1="50%" x2="100%" y2="40%" />
                            </svg>
                            <div className="absolute h-full w-[1px] bg-green-500/50 left-[50%]"></div>
                            <div className="absolute top-[40%] left-[50%] text-[8px] text-green-400 bg-black px-1">T</div>
                        </div>
                        <div className="absolute right-2 top-8 text-right">
                            <div className="text-[10px] text-slate-500">RATIO</div>
                            <div className="text-sm font-bold text-white font-mono">{selectedCh.comp ? '4:1' : '1:1'}</div>
                        </div>
                    </div>
                </div>

            </div>

            {/* The Fader Strips */}
            <div className="flex gap-2 justify-center bg-slate-800 p-4 rounded-b-lg rounded-t-sm shadow-inner">
                {channels.map((ch) => (
                    <div key={ch.id} className="flex flex-col items-center gap-2 group w-20">
                        {/* SELECT Button */}
                        <button
                            onClick={() => setSelectedChId(ch.id)}
                            className={clsx(
                                "w-16 h-8 rounded text-[10px] font-bold tracking-wider transition-all shadow-md active:scale-95 border",
                                selectedChId === ch.id
                                    ? "bg-amber-500 text-amber-950 border-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                                    : "bg-slate-700 text-slate-400 border-slate-600 hover:bg-slate-600"
                            )}
                        >
                            SEL
                        </button>

                        {/* Fader Track */}
                        <div className="w-12 h-44 bg-slate-950 rounded-lg border border-slate-900 relative shadow-inner">
                            {/* Fader Cap (Static for this demo, just visual) */}
                            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-8 h-12 bg-gradient-to-b from-slate-400 to-slate-600 rounded shadow-lg border-t border-slate-300">
                                <div className="w-full h-[1px] bg-slate-800 mt-6" />
                            </div>
                            {/* Tick marks */}
                            <div className="absolute right-1 top-4 w-1 h-[1px] bg-slate-700" />
                            <div className="absolute right-1 top-1/2 w-1 h-[1px] bg-slate-600" />
                            <div className="absolute right-1 bottom-4 w-1 h-[1px] bg-slate-700" />
                        </div>

                        {/* Scribble Strip */}
                        <div className={clsx(
                            "w-full py-1 text-center text-xs font-mono font-bold truncate rounded",
                            selectedChId === ch.id ? "bg-emerald-900 text-emerald-400" : "bg-slate-950 text-slate-500"
                        )}>
                            {ch.label}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center text-slate-400 text-sm">
                <p>下の「SEL」ボタンを押すと、上の画面が切り替わります。<br />
                    これがデジタル卓の基本操作作法、<strong>「Select First」</strong>です。</p>
            </div>
        </div>
    );
}
