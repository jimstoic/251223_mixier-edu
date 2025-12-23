
'use client';

import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Settings2, Sliders, Monitor, Youtube, Mic } from 'lucide-react';

// Extended Channel Data
const initialChannels = [
    { id: 1, label: 'MC', color: 'text-pink-400', bg: 'bg-pink-500', masterOn: true, mix1: 0, mix1Pre: true, mix2: 100, mix2Pre: false, mix3: 100, mix3Pre: false },
    { id: 2, label: 'Guest A', color: 'text-cyan-400', bg: 'bg-cyan-500', masterOn: true, mix1: 100, mix1Pre: true, mix2: 100, mix2Pre: false, mix3: 100, mix3Pre: false },
    { id: 3, label: 'Guest B', color: 'text-cyan-400', bg: 'bg-cyan-500', masterOn: true, mix1: 100, mix1Pre: true, mix2: 100, mix2Pre: false, mix3: 100, mix3Pre: false },
    { id: 4, label: 'Zoom L', color: 'text-blue-400', bg: 'bg-blue-500', masterOn: true, mix1: 0, mix1Pre: true, mix2: 100, mix2Pre: false, mix3: 100, mix3Pre: false },
    { id: 5, label: 'Zoom R', color: 'text-blue-400', bg: 'bg-blue-500', masterOn: true, mix1: 0, mix1Pre: true, mix2: 100, mix2Pre: false, mix3: 100, mix3Pre: false },
    { id: 6, label: 'BGM L', color: 'text-yellow-400', bg: 'bg-yellow-500', masterOn: true, mix1: 40, mix1Pre: true, mix2: 100, mix2Pre: false, mix3: 100, mix3Pre: false },
    { id: 7, label: 'BGM R', color: 'text-yellow-400', bg: 'bg-yellow-500', masterOn: true, mix1: 40, mix1Pre: true, mix2: 100, mix2Pre: false, mix3: 100, mix3Pre: false },
];

export default function MultiBusVis() {
    const [channels, setChannels] = useState(initialChannels);
    const [selectedChId, setSelectedChId] = useState<number>(1);
    const [viewMode, setViewMode] = useState<'channel_centric' | 'bus_centric'>('channel_centric');
    const [selectedBus, setSelectedBus] = useState<'mix1' | 'mix2' | 'mix3'>('mix1');

    // --- Data Update Helpers ---

    const updateChannel = (chId: number, key: string, value: any) => {
        setChannels(prev => prev.map(ch =>
            ch.id === chId ? { ...ch, [key]: value } : ch
        ));
    };

    // Helper to get selected channel data
    const selectedCh = channels.find(c => c.id === selectedChId) || channels[0];

    return (
        <div className="w-full p-6 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-6 font-sans">

            {/* --- TOP BAR: View Mode Toggle --- */}
            <div className="flex flex-col md:flex-row justify-between items-center pb-4 border-b border-slate-800 gap-4">
                <div className="text-sm font-bold text-slate-300 flex items-center gap-2">
                    <Settings2 className="w-4 h-4 text-emerald-500" />
                    Routing Explorer
                </div>
                <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 w-full md:w-auto">
                    <button
                        onClick={() => setViewMode('channel_centric')}
                        className={clsx(
                            "flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded transition-all",
                            viewMode === 'channel_centric' ? "bg-indigo-600 text-white shadow" : "text-slate-500 hover:text-slate-300"
                        )}
                    >
                        Channel View (Input中心)
                    </button>
                    <button
                        onClick={() => setViewMode('bus_centric')}
                        className={clsx(
                            "flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded transition-all flex items-center justify-center gap-1",
                            viewMode === 'bus_centric' ? "bg-amber-600 text-white shadow" : "text-slate-500 hover:text-slate-300"
                        )}
                    >
                        <Sliders className="w-3 h-3" />
                        Sends on Fader (Bus中心)
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 min-h-[450px]">

                {/* =========================================================
                    MODE A: CHANNEL CENTRIC (Select CH -> See Sends)
                   ========================================================= */}
                {viewMode === 'channel_centric' && (
                    <>
                        {/* --- LEFT: CHANNEL SELECTOR --- */}
                        <div className="flex flex-col gap-2 bg-slate-900/50 p-2 rounded-lg border border-slate-800 md:w-48 overflow-y-auto max-h-[500px]">
                            <div className="text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-wide px-2">Select Channel</div>
                            {channels.map((ch) => (
                                <button
                                    key={ch.id}
                                    onClick={() => setSelectedChId(ch.id)}
                                    className={clsx(
                                        "w-full px-3 py-2 rounded text-left font-bold text-xs transition-all flex items-center justify-between group",
                                        selectedChId === ch.id
                                            ? `bg - slate - 800 border - l - 2 border - ${ch.color.substring(5)} text - white shadow`
                                            : "hover:bg-slate-800/50 text-slate-500"
                                    )}
                                >
                                    <span>{ch.label}</span>
                                    <div className={clsx("w-2 h-2 rounded-full", ch.bg, selectedChId !== ch.id && "opacity-30 group-hover:opacity-100")} />
                                </button>
                            ))}
                        </div>

                        {/* --- RIGHT: SENDS VIEW --- */}
                        <div className="flex-1 bg-black rounded-xl border border-slate-700 p-6 relative overflow-hidden flex flex-col">
                            <div className="absolute inset-0 bg-[url('/grid_dot.png')] opacity-20 pointer-events-none" />

                            <div className="flex items-center gap-4 mb-6 z-10">
                                <div className={clsx("text-3xl font-bold", selectedCh.color)}>{selectedCh.label}</div>
                                <div className="h-px flex-1 bg-slate-800" />
                                <div className="text-xs text-slate-500 font-mono">CHANNEL SENDS</div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 z-10">
                                {/* MAIN */}
                                <div className="bg-slate-900 border border-slate-800 rounded p-3 flex flex-col items-center">
                                    <div className="text-red-500 text-[10px] font-bold mb-2">MAIN (ST)</div>
                                    <button
                                        onClick={() => updateChannel(selectedCh.id, 'masterOn', !selectedCh.masterOn)}
                                        className={clsx(
                                            "w-12 h-10 rounded border text-xs font-bold transition-all",
                                            selectedCh.masterOn ? "bg-red-600 border-red-500 text-white" : "bg-slate-800 border-slate-700 text-slate-500"
                                        )}
                                    >
                                        {selectedCh.masterOn ? 'ON' : 'OFF'}
                                    </button>
                                </div>

                                {/* MIX 1 Zoom */}
                                <div className="bg-slate-900 border border-slate-800 rounded p-3 flex flex-col items-center">
                                    <div className="text-emerald-500 text-[10px] font-bold mb-2 text-center">MIX 1<br />(Zoom)</div>
                                    <input
                                        type="range" min="0" max="100"
                                        value={selectedCh.mix1}
                                        onChange={(e) => updateChannel(selectedCh.id, 'mix1', Number(e.target.value))}
                                        className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer mb-2"
                                    />
                                    <div className="flex gap-2 items-center mb-1">
                                        <div className="text-emerald-500 font-mono text-xs">{selectedCh.mix1}</div>
                                        <button
                                            onClick={() => updateChannel(selectedCh.id, 'mix1Pre', !selectedCh.mix1Pre)}
                                            className={clsx(
                                                "px-1.5 py-0.5 text-[9px] font-bold rounded border transition-colors",
                                                selectedCh.mix1Pre
                                                    ? "bg-amber-500/20 border-amber-500 text-amber-500"
                                                    : "bg-slate-800 border-slate-600 text-slate-500"
                                            )}
                                        >
                                            {selectedCh.mix1Pre ? 'PRE' : 'POST'}
                                        </button>
                                    </div>
                                </div>

                                {/* MIX 2 YouTube */}
                                <div className="bg-slate-900 border border-slate-800 rounded p-3 flex flex-col items-center">
                                    <div className="text-pink-500 text-[10px] font-bold mb-2 text-center">MIX 2<br />(YouTube)</div>
                                    <input
                                        type="range" min="0" max="100"
                                        value={selectedCh.mix2}
                                        onChange={(e) => updateChannel(selectedCh.id, 'mix2', Number(e.target.value))}
                                        className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer mb-2"
                                    />
                                    <div className="flex gap-2 items-center mb-1">
                                        <div className="text-pink-500 font-mono text-xs">{selectedCh.mix2}</div>
                                        <button
                                            onClick={() => updateChannel(selectedCh.id, 'mix2Pre', !selectedCh.mix2Pre)}
                                            className={clsx(
                                                "px-1.5 py-0.5 text-[9px] font-bold rounded border transition-colors",
                                                selectedCh.mix2Pre
                                                    ? "bg-amber-500/20 border-amber-500 text-amber-500"
                                                    : "bg-slate-800 border-slate-600 text-slate-500"
                                            )}
                                        >
                                            {selectedCh.mix2Pre ? 'PRE' : 'POST'}
                                        </button>
                                    </div>
                                </div>

                                {/* MIX 3 Rec */}
                                <div className="bg-slate-900 border border-slate-800 rounded p-3 flex flex-col items-center">
                                    <div className="text-cyan-500 text-[10px] font-bold mb-2 text-center">MIX 3<br />(Rec)</div>
                                    <input
                                        type="range" min="0" max="100"
                                        value={selectedCh.mix3}
                                        onChange={(e) => updateChannel(selectedCh.id, 'mix3', Number(e.target.value))}
                                        className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer mb-2"
                                    />
                                    <div className="flex gap-2 items-center mb-1">
                                        <div className="text-cyan-500 font-mono text-xs">{selectedCh.mix3}</div>
                                        <button
                                            onClick={() => updateChannel(selectedCh.id, 'mix3Pre', !selectedCh.mix3Pre)}
                                            className={clsx(
                                                "px-1.5 py-0.5 text-[9px] font-bold rounded border transition-colors",
                                                selectedCh.mix3Pre
                                                    ? "bg-amber-500/20 border-amber-500 text-amber-500"
                                                    : "bg-slate-800 border-slate-600 text-slate-500"
                                            )}
                                        >
                                            {selectedCh.mix3Pre ? 'PRE' : 'POST'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Feedback Help */}
                            <div className="mt-8 p-3 bg-indigo-900/20 border border-indigo-500/30 rounded text-xs text-indigo-300">
                                <span className="font-bold">💡 Hint:</span> 左側のリストからチャンネルを変えると、それぞれの設定値（Sends）が確認できます。
                            </div>
                        </div>
                    </>
                )}


                {/* =========================================================
                    MODE B: BUS CENTRIC (Sends on Fader)
                   ========================================================= */}
                {viewMode === 'bus_centric' && (
                    <>
                        {/* --- LEFT: BUS SELECTOR --- */}
                        <div className="flex flex-col gap-2 bg-slate-900/50 p-2 rounded-lg border border-slate-800 md:w-48">
                            <div className="text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-wide px-2">Select Mix Bus</div>

                            <button
                                onClick={() => setSelectedBus('mix1')}
                                className={clsx(
                                    "w-full px-3 py-3 rounded text-left font-bold text-xs transition-all flex items-center justify-between",
                                    selectedBus === 'mix1'
                                        ? "bg-emerald-900/50 border-l-4 border-emerald-500 text-emerald-400 shadow"
                                        : "hover:bg-slate-800/50 text-slate-500"
                                )}
                            >
                                <span>MIX 1 (Zoom)</span>
                                <Monitor size={14} />
                            </button>

                            <button
                                onClick={() => setSelectedBus('mix2')}
                                className={clsx(
                                    "w-full px-3 py-3 rounded text-left font-bold text-xs transition-all flex items-center justify-between",
                                    selectedBus === 'mix2'
                                        ? "bg-pink-900/50 border-l-4 border-pink-500 text-pink-400 shadow"
                                        : "hover:bg-slate-800/50 text-slate-500"
                                )}
                            >
                                <span>MIX 2 (YouTube)</span>
                                <Youtube size={14} />
                            </button>

                            <button
                                onClick={() => setSelectedBus('mix3')}
                                className={clsx(
                                    "w-full px-3 py-3 rounded text-left font-bold text-xs transition-all flex items-center justify-between",
                                    selectedBus === 'mix3'
                                        ? "bg-cyan-900/50 border-l-4 border-cyan-500 text-cyan-400 shadow"
                                        : "hover:bg-slate-800/50 text-slate-500"
                                )}
                            >
                                <span>MIX 3 (Rec)</span>
                                <Mic size={14} />
                            </button>
                        </div>

                        {/* --- RIGHT: FADERS VIEW --- */}
                        <div className="flex-1 bg-black rounded-xl border border-slate-700 p-6 relative overflow-hidden flex flex-col">
                            <div className="absolute inset-0 bg-[url('/grid_dot.png')] opacity-20 pointer-events-none" />

                            {/* Mode Indicator */}
                            <div className={clsx(
                                "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-50 animate-pulse",
                                selectedBus === 'mix1' ? "from-emerald-500 via-emerald-300 to-emerald-500" :
                                    selectedBus === 'mix2' ? "from-pink-500 via-pink-300 to-pink-500" :
                                        "from-cyan-500 via-cyan-300 to-cyan-500"
                            )} />

                            <div className="flex gap-2 items-center mb-6 z-10">
                                <span className="text-amber-500 font-bold text-xs">⚡️ SENDS ON FADER:</span>
                                <span className={clsx("text-sm font-bold px-2 py-0.5 rounded",
                                    selectedBus === 'mix1' ? "bg-emerald-900 text-emerald-300" :
                                        selectedBus === 'mix2' ? "bg-pink-900 text-pink-300" :
                                            "bg-cyan-900 text-cyan-300"
                                )}>
                                    Now Controlling: {selectedBus === 'mix1' ? 'MIX 1 (Zoom)' : selectedBus === 'mix2' ? 'MIX 2 (YouTube)' : 'MIX 3 (Rec)'}
                                </span>
                            </div>

                            {/* FADER BED */}
                            <div className="flex-1 flex justify-between items-end gap-1 px-2 pb-2 z-10 overflow-x-auto">
                                {channels.map(ch => {
                                    // Determine value based on selected bus
                                    const val = selectedBus === 'mix1' ? ch.mix1 :
                                        selectedBus === 'mix2' ? ch.mix2 :
                                            ch.mix3;

                                    const isPre = selectedBus === 'mix1' ? ch.mix1Pre :
                                        selectedBus === 'mix2' ? ch.mix2Pre :
                                            ch.mix3Pre;

                                    const preKey = selectedBus === 'mix1' ? 'mix1Pre' :
                                        selectedBus === 'mix2' ? 'mix2Pre' :
                                            'mix3Pre';

                                    // Dynamic update handler using Pointer Events
                                    const handlePointer = (e: React.PointerEvent<HTMLDivElement>) => {
                                        // Only handle primary button
                                        if (e.buttons !== 1) return;

                                        const rect = e.currentTarget.getBoundingClientRect();
                                        // Calculate height from bottom (0% is bottom, 100% is top)
                                        const y = e.clientY - rect.top;
                                        const height = rect.height;
                                        // Invert Y because clientY goes down, but we want 100 at top
                                        let percent = ((height - y) / height) * 100;

                                        // Clamp
                                        if (percent < 0) percent = 0;
                                        if (percent > 100) percent = 100;

                                        updateChannel(ch.id, selectedBus, Math.round(percent));
                                    };

                                    return (
                                        <div
                                            key={ch.id}
                                            className="relative w-12 h-64 flex flex-col items-center justify-end bg-slate-900/30 rounded border border-slate-800 pb-6 group hover:bg-slate-900/50 transition-colors touch-none select-none cursor-ns-resize"
                                            onPointerDown={(e) => {
                                                e.currentTarget.setPointerCapture(e.pointerId);
                                                handlePointer(e);
                                            }}
                                            onPointerMove={(e) => {
                                                if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                                                    handlePointer(e);
                                                }
                                            }}
                                            onPointerUp={(e) => e.currentTarget.releasePointerCapture(e.pointerId)}
                                        >

                                            {/* Track */}
                                            <div className="absolute top-4 bottom-8 w-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className={clsx("w-full absolute bottom-0 transition-all opacity-50",
                                                        selectedBus === 'mix1' ? "bg-emerald-500" :
                                                            selectedBus === 'mix2' ? "bg-pink-500" :
                                                                "bg-cyan-500"
                                                    )}
                                                    style={{ height: `${val}%` }}
                                                />
                                            </div>

                                            {/* Handle (Physically synced to percent) */}
                                            <div className="absolute top-4 bottom-8 w-full pointer-events-none">
                                                <div
                                                    className={clsx(
                                                        "absolute left-1/2 -translate-x-1/2 w-8 h-12 bg-gradient-to-b from-slate-600 to-slate-800 rounded shadow-[0_4px_10px_rgba(0,0,0,0.5)] border-t border-slate-500 flex items-center justify-center transition-all duration-75 ease-out",
                                                        "pointer-events-auto cursor-ns-resize hover:from-slate-500 hover:to-slate-700"
                                                    )}
                                                    style={{ bottom: `${val}%`, transform: `translate(-50%, 50%)` }} // Center handle on value
                                                >
                                                    <div className="w-6 h-[2px] bg-slate-900/50" />
                                                </div>
                                            </div>

                                            {/* (Invisible Input Removed - Using Pointer Events) */}

                                            <div className="absolute bottom-1 w-full flex justify-center overflow-visible z-20">
                                                <div className="text-[10px] font-bold text-slate-400 whitespace-nowrap origin-center -rotate-45 translate-y-3">{ch.label}</div>
                                            </div>

                                            {/* Pre/Post Toggle (Mini) */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    updateChannel(ch.id, preKey, !isPre);
                                                }}
                                                className={clsx(
                                                    "absolute -bottom-8 px-1 py-0.5 text-[8px] font-bold rounded border z-20 pointer-events-auto",
                                                    isPre
                                                        ? "bg-amber-500/20 border-amber-500 text-amber-500"
                                                        : "bg-slate-800 border-slate-700 text-slate-600"
                                                )}
                                            >
                                                {isPre ? 'PRE' : 'POST'}
                                            </button>

                                            {/* Floating Value */}
                                            <div className={clsx(
                                                "absolute -top-6 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity",
                                                selectedBus === 'mix1' ? "text-emerald-500" :
                                                    selectedBus === 'mix2' ? "text-pink-500" :
                                                        "text-cyan-500"
                                            )}>
                                                {val}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <p className="text-center text-xs text-slate-500 mt-2 font-mono">
                                Use faders to mix for <span className="text-white font-bold">{selectedBus === 'mix1' ? 'Zoom' : selectedBus === 'mix2' ? 'YouTube' : 'Recording'}</span>
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

