'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

export default function SignalFlow() {
    const [isMuted, setIsMuted] = useState(false);

    // Track which step is hovered to show tooltip
    const [hoveredStep, setHoveredStep] = useState<string | null>(null);

    // The simplified chain with Descriptions
    const chain = [
        { id: 'input', label: 'マイク入力', desc: '音の入り口です。微弱な電気信号が入ってきます。', type: 'source' },
        { id: 'gain', label: 'HAゲイン', desc: '【増幅】微弱な信号をラインレベルまで大きく持ち上げます。音質の要です。', type: 'proc' },
        { id: 'eq', label: 'EQ / コンプ', desc: '【整形】音色（イコライザー）や音の抑揚（コンプレッサー）を整えます。', type: 'proc' },
        { id: 'fader', label: 'フェーダー', desc: '【水量調整】最終的にスピーカーに出す音量を調整します。', type: 'proc' },
        { id: 'mute', label: 'MUTE (On/Off)', desc: '【遮断】信号を完全にカットします。緊急時や不要な時に使います。', type: 'switch', active: isMuted, toggle: () => setIsMuted(!isMuted) },
        { id: 'output', label: 'メイン出力', desc: '【出口】スピーカーやアンプに向かって音が出ていく場所です。', type: 'sink' },
    ];

    // Logic: Signal flows until it hits the Mute switch IF it is engaged.
    const muteIndex = chain.findIndex(c => c.id === 'mute');
    const signalCutoffIndex = isMuted ? muteIndex : chain.length;

    return (
        <div className="w-full h-48 bg-slate-950 rounded-xl border border-slate-800 relative flex items-center justify-between px-8 overflow-visible">

            {/* Tooltip Overlay using AnimatePresence */}
            <AnimatePresence>
                {hoveredStep && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute -top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-800/95 text-slate-100 border border-slate-600 px-4 py-2 rounded-lg shadow-xl backdrop-blur-md max-w-sm w-full text-center pointer-events-none"
                    >
                        <h4 className="font-bold text-cyan-400 mb-1">
                            {chain.find(c => c.id === hoveredStep)?.label}
                        </h4>
                        <p className="text-sm text-slate-300">
                            {/* @ts-ignore */}
                            {chain.find(c => c.id === hoveredStep)?.desc}
                        </p>
                        {/* Little Arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800/90" />
                    </motion.div>
                )}
            </AnimatePresence>


            {/* Connection Line (The Cable) - Aligned to center of the 48px buttons (top-8 + 24px = 56px approx, depending on padding) */}
            {/* Container padding is default, let's assume centered. The button is h-12 (48px). */}
            {/* Let's center everything in a flex row to be safe, or just hardcode the line top. */}
            <div className="absolute left-8 right-8 top-[3.5rem] h-1 bg-slate-800 -z-0 translate-y-[-50%]">
                <motion.div
                    className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] origin-left"
                    initial={{ scaleX: 1 }}
                    animate={{
                        scaleX: isMuted ? (muteIndex / (chain.length - 1)) : 1
                    }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Nodes */}
            {chain.map((step, index) => {
                const isPassed = index <= signalCutoffIndex;
                const isSwitch = step.type === 'switch';

                return (
                    <div
                        key={step.id}
                        className="relative z-10 flex flex-col items-center gap-3 group pt-4" // Added top padding to push nodes down slightly if needed, but flex-items-center on container handles vertical centering.
                        onMouseEnter={() => setHoveredStep(step.id)}
                        onMouseLeave={() => setHoveredStep(null)}
                    >
                        {/* Node Visual */}
                        <motion.button
                            onClick={isSwitch ? step.toggle : undefined}
                            whileHover={{ scale: 1.1 }}
                            whileTap={isSwitch ? { scale: 0.95 } : undefined}
                            className={clsx(
                                "w-12 h-12 rounded-full border-4 flex items-center justify-center shadow-lg transition-all duration-300 relative bg-slate-900",
                                isSwitch ? "cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-offset-slate-950 hover:ring-red-500" : "cursor-help",
                                step.type === 'source' || step.type === 'sink' ? "border-slate-600 rounded-sm" : "border-slate-700",
                                // Active State Colors
                                isSwitch && step.active
                                    ? "bg-red-500 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                                    : isPassed ? "border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]" : "border-slate-800 opacity-50"
                            )}
                        >
                            {/* Inner Dot */}
                            <div className={clsx(
                                "w-4 h-4 rounded-full transition-colors",
                                isSwitch && step.active ? "bg-white" : isPassed ? "bg-cyan-400" : "bg-slate-700"
                            )} />
                        </motion.button>

                        <span className={clsx(
                            "text-xs font-bold font-mono tracking-widest uppercase transition-colors",
                            isPassed ? "text-slate-300" : "text-slate-600"
                        )}>
                            {step.label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
