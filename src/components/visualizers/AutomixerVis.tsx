'use client';

import React, { useState, useEffect } from 'react';
import { Mic } from 'lucide-react';

const ChannelStrip = ({ label, level, setLevel, gainReduction }: any) => {
    return (
        <div className="flex flex-col items-center gap-4 bg-slate-900 border border-slate-700 p-4 rounded-lg w-24 relative overflow-hidden transition-all duration-300">
            {/* Gain Reduction Meter (Top down) */}
            <div className="absolute top-0 left-0 w-full h-2 bg-slate-800">
                <div
                    className="h-full bg-red-500 transition-all duration-300"
                    style={{ width: `${Math.min(gainReduction, 100)}%` }} // Show reduction amount
                />
            </div>

            <div className="mt-2 text-slate-400 font-bold text-xs">{label}</div>
            <Mic className={`w-8 h-8 ${level > 50 ? 'text-emerald-400' : 'text-slate-600'} transition-colors`} />

            {/* Fader Area */}
            <div className="h-48 w-full bg-slate-950 rounded-full relative border border-slate-800">
                {/* Active Level Visualization */}
                <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-t from-emerald-500/50 to-transparent transition-all duration-100"
                    style={{ height: `${level}%` }}
                />

                <input
                    type="range"
                    min="0"
                    max="100"
                    value={level}
                    onChange={(e) => setLevel(Number(e.target.value))}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[192px] h-[50px] -rotate-90 cursor-ns-resize z-20 opacity-0"
                />

                {/* Fader Cap */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 w-8 h-12 bg-slate-300 rounded shadow-xl pointer-events-none transition-all duration-75"
                    style={{ bottom: `calc(${level}% - 24px)` }}
                >
                    <div className="w-full h-[1px] bg-slate-900 mt-6" />
                </div>
            </div>

            <div className="text-xs font-mono text-slate-500">
                GR: -{Math.round(gainReduction / 5)}dB
            </div>
        </div>
    );
};

export default function AutomixerVis() {
    const [levels, setLevels] = useState([0, 0, 0, 0]); // Mic 1-4
    const [reduction, setReduction] = useState([0, 0, 0, 0]);

    // Simple Dugan-style Logic simulation
    useEffect(() => {
        // Total sum of levels (plus a noise floor to prevent division by zero)
        const totalLevel = levels.reduce((a, b) => a + b, 0) + 10;

        const newReductions = levels.map(level => {
            // Simplified: The stronger you are relative to total, the less you are reduced.
            // Theoretical: Gain = Input / Sum(Inputs)
            // Here we visualize Reduction amount.
            // If Input is 0, Reduction is high (or irrelevant).

            if (level === 0) return 0;

            const ratio = level / totalLevel;
            // Examples:
            // 1 active (100 vs 100+10) -> ratio ~0.9 -> Low reduction
            // 2 active (100, 100 vs 210) -> ratio ~0.47 -> -3dB each
            // 4 active (100,100,100,100 vs 410) -> ratio ~0.24 -> -6dB each

            // Visual mapping: 1.0 ratio = 0 reduction. 0.25 ratio = high reduction.
            const reductionAmount = (1 - ratio) * 100; // 0 to 100 scale for UI
            return reductionAmount;
        });

        setReduction(newReductions);

    }, [levels]);

    const setLevel = (index: number, val: number) => {
        const newLevels = [...levels];
        newLevels[index] = val;
        setLevels(newLevels);
    };

    return (
        <div className="w-full panel-base p-8 flex flex-col items-center gap-8">
            <div className="flex items-center gap-4 text-emerald-500 border border-emerald-500/30 bg-emerald-950/30 px-4 py-2 rounded-lg">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                <span className="font-bold tracking-widest text-sm">DUGAN AUTOMIXER ACTIVE</span>
            </div>

            <div className="flex justify-center gap-4 flex-wrap">
                <ChannelStrip label="Mic 1 (MC)" level={levels[0]} setLevel={(v: number) => setLevel(0, v)} gainReduction={reduction[0]} />
                <ChannelStrip label="Mic 2 (Guest A)" level={levels[1]} setLevel={(v: number) => setLevel(1, v)} gainReduction={reduction[1]} />
                <ChannelStrip label="Mic 3 (Guest B)" level={levels[2]} setLevel={(v: number) => setLevel(2, v)} gainReduction={reduction[2]} />
                <ChannelStrip label="Mic 4 (Guest C)" level={levels[3]} setLevel={(v: number) => setLevel(3, v)} gainReduction={reduction[3]} />
            </div>

            <div className="text-slate-400 text-sm max-w-lg text-center leading-relaxed">
                <p>フェーダーを上げて「喋っている状態」を作ってください。<br />
                    <strong>誰か一人が喋ると、他の人のマイクゲインが自動で下がります（GR）。</strong><br />
                    全員が同時に喋ると、全員のゲインが均等に下がり、合計レベルが一定に保たれます。</p>
            </div>
        </div>
    );
}
